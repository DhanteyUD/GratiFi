interface CommunityProps {
  id?: string;
}

function Community({ id }: CommunityProps) {
  return <div id={id}>Community</div>;
}

export default Community;
