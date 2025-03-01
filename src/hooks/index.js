import { useSelector } from "react-redux";
import { logout } from "@redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { throttle } from "lodash";
import { useGetPostQuery } from "@services/postApi";
import { useSearchUsersQuery } from "@services/rootApi";

export const useUserInfo = () => {
  return useSelector((state) => state.auth.useInfo);
};

export const useUseLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return { logoutUser };
};

export const useDetectLayout = () => {
  const theme = useTheme();
  const isMediumLayout = useMediaQuery(theme.breakpoints.down("md"));
  return { isMediumLayout };
};

export const useLazyLoadPosts = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const {
    data = { ids: [], entities: [] },
    isFetching,
    refetch,
  } = useGetPostQuery({
    limit,
    offset,
  });
  console.log(offset);

  const posts = data.ids.map((id) => data.entities[id]);
  const prevPostCountRef = useRef(0);

  useEffect(() => {
    if (!isFetching && data && hasMore) {
      const currentPostCount = data.ids.length;
      const newFetchedCount = currentPostCount - prevPostCountRef.current;
      if (newFetchedCount === 0) {
        setHasMore(false);
      } else {
        prevPostCountRef.current = currentPostCount;
      }
    }
  }, [isFetching, data.ids, hasMore]);

  const loadMore = useCallback(() => {
    setOffset((prevOffset) => prevOffset + limit);
  }, []);

  useEffect(() => {
    refetch();
  }, [offset]);

  useInfinitedScroll({
    hasMore,
    isFetching,
    loadMore,
  });

  return { posts, isFetching };
};

export const useInfinitedScroll = ({
  hasMore,
  isFetching,
  loadMore,
  threshold = 70,
  throttleMiliseccond = 500,
}) => {
  const handleScroll = useMemo(() => {
    return throttle(() => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (!hasMore) {
        return;
      }
      if (scrollTop + clientHeight + threshold >= scrollHeight) {
        loadMore();
      }
    }, throttleMiliseccond);
  }, [hasMore, isFetching, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);
};

export const useLazyLoadSearchUsers = ({ searchQuery }) => {
  const [offsetUsers, setOffsetUsers] = useState(0);
  const limitUsers = 10;
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const previousDataRef = useRef();
  const { data, isLoading, isFetching, isSuccess, refetch } =
    useSearchUsersQuery({
      limit: limitUsers,
      offset: offsetUsers,
      searchQuery: searchQuery,
    });
  const totalUser = data?.total;

  useEffect(() => {
    if (
      isSuccess &&
      Array.isArray(data?.users) &&
      previousDataRef.current !== data?.users
    ) {
      if (data?.users?.length === 0) {
        setHasMore(false);
        return;
      }
      previousDataRef.current = data?.users;
      setUsers((prev) => {
        if (offsetUsers === 0) return data?.users;
        return [...prev, ...data?.users];
      });
    }
  }, [isSuccess, data, offsetUsers]);

  const loadMore = useCallback(() => {
    setOffsetUsers((prevOffset) => prevOffset + limitUsers);
  }, []);

  useInfinitedScrollSearchUsers({
    hasMore,
    isFetching,
    loadMore,
    offsetUsers,
    resetFuntion: () => {
      setOffsetUsers(0);
      setHasMore(true);
      previousDataRef.current = null;
    },
  });

  return {
    users,
    hasMore,
    isLoading,
    isFetching,
    loadMore,
    offsetUsers,
    totalUser,
  };
};

export const useInfinitedScrollSearchUsers = ({
  hasMore,
  isFetching,
  loadMore,
  offset,
  resetFuntion = () => {},
  threshold = 50,
  throttleMiliseccond = 500,
}) => {
  const handleScroll = useMemo(() => {
    return throttle(() => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (!hasMore || isFetching) {
        return;
      }
      if (scrollTop + clientHeight + threshold >= scrollHeight) {
        loadMore();
      }
    }, throttleMiliseccond);
  }, [
    hasMore,
    isFetching,
    loadMore,
    offset,
    resetFuntion,
    threshold,
    throttleMiliseccond,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);
};
