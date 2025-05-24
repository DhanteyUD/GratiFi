import { FetchMyPosts } from "@/hooks/UseFetch";
import type { Post } from "@/types";
import PostCardSkeleton from "@/pages/screen/01_Home/components/PostCardSkeleton";
import PostFeed from "@/pages/screen/01_Home/components/PostFeed";
import helperService from "@/services/helper.service";

interface PostFeedProps {
  activeTab: string;
}

const ProfilePostFeed = ({ activeTab }: PostFeedProps) => {
  const { fetchingMyPosts, myPosts } = FetchMyPosts();

  return (
    <div>
      {fetchingMyPosts ? (
        <PostCardSkeleton />
      ) : activeTab === "Posts" ? (
        myPosts.map((post: Post) => (
          <PostFeed
            key={post.id}
            authorImage={post.author.picture}
            authorName={post.author.name}
            authorUsername={post.author.email.split("@")[0]}
            userType={post.author.user_type}
            timeStamp={helperService.formatTimeWithMoment(post.createdAt)}
            content={post.text}
            media={post.media}
            comments={0}
            reposts={0}
            likes={0}
          />
        ))
      ) : null}
    </div>
  );
};

export default ProfilePostFeed;
