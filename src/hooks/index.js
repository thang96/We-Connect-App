import { useSelector } from "react-redux";
import { logout } from "@redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGetPostQuery, useSearchUsersQuery } from "@services/rootApi";
import { throttle } from "lodash";

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

export const useLazyLoad = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const previousDataRef = useRef();
  const { data, isLoading, isFetching, isSuccess } = useGetPostQuery({
    limit,
    offset,
  });

  useEffect(() => {
    if (isSuccess && data && previousDataRef.current !== data) {
      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      previousDataRef.current = data;
      setPosts((prev) => {
        if (offset === 0) return data;
        return [...prev, ...data];
      });
    }
  }, [isSuccess, data, offset]);

  const loadMore = useCallback(() => {
    setOffset((prevOffset) => prevOffset + limit);
  }, []);

  useInfinitedScroll({
    hasMore,
    isFetching,
    loadMore,
    offset,
    resetFuntion: () => {
      setOffset(0);
      setHasMore(true);
      previousDataRef.current = null;
    },
  });

  return { posts, hasMore, isLoading, isFetching, loadMore };
};

export const useLazyLoadSearchUsers = ({ searchQuery }) => {
  const [offsetUsers, setOffsetUsers] = useState(0);
  const limitUsers = 10;
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const previousDataRef = useRef();
  const { data, isLoading, isFetching, isSuccess } = useSearchUsersQuery({
    limit: limitUsers,
    offset: offsetUsers,
    searchQuery: searchQuery,
  });

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
        // eslint-disable-next-line no-unsafe-optional-chaining
        return [...prev, ...data?.users];
      });
    }
  }, [isSuccess, data, offsetUsers]);

  const loadMore = useCallback(() => {
    setOffsetUsers((prevOffset) => prevOffset + limitUsers);
  }, []);

  useInfinitedScroll({
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

  return { users, hasMore, isLoading, isFetching, loadMore };
};

export const useInfinitedScroll = ({
  hasMore,
  isFetching,
  loadMore,
  threshold = 50,
  throttleMiliseccond = 500,
  offset,
  resetFuntion,
}) => {
  const handleScroll = useMemo(() => {
    return throttle(() => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop < 100 && offset > 0) {
        resetFuntion();
      }

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
