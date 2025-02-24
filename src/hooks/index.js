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
      setPosts((prev) => [...prev, ...data]);
    }
  }, [isSuccess, data]);

  const loadMore = useCallback(() => {
    setOffset((prevOffset) => prevOffset + limit);
  }, []);

  useInfinitedScroll({ hasMore, isFetching, loadMore });

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
      if (data?.users?.length === 0 && data?.offset < data?.total) {
        setHasMore(false);
        return;
      }
      previousDataRef.current = data?.users;
      setUsers(data.users);
    }
  }, [isSuccess, data]);
  const loadMore = useCallback(() => {
    setOffsetUsers((prevOffset) => prevOffset + limitUsers);
  }, []);

  useInfinitedScroll({ hasMore, isFetching, loadMore });
 
  return { users, hasMore, isLoading, isFetching, loadMore };
};

export const useInfinitedScroll = ({
  hasMore,
  isFetching,
  loadMore,
  threshold = 50,
  throttleMiliseccond = 500,
}) => {
  const handleScroll = useMemo(() => {
    return throttle(() => {
      if (!hasMore || isFetching) {
        return;
      }
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight + threshold >= scrollHeight) {
        loadMore();
      }
    }, throttleMiliseccond);
  }, [hasMore, isFetching, loadMore, threshold, throttleMiliseccond]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);
};
