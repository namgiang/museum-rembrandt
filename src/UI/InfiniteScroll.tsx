import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type InfiniteScrollProps = {
  loadMore: () => void;
  isLoading: boolean;
  children: React.ReactNode;
  hasMore: boolean;
};

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  isLoading,
  children,
  hasMore,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {children}
      {hasMore && !isLoading && (
        <div ref={ref} style={{ textAlign: "center" }}>
          Loading more...
        </div>
      )}
    </div>
  );
};
