// Overflow, List of cards
// title, description, hastags, likeCount

export default function ProgramList() {
  return (
    <Container>
      <Header>
        <ProgramTitle>{title}</ProgramTitle>
        <Likes>{likes === 1 ? "1 like" : `${likeCount} likes`}</Likes>
        {/* private */}
      </Header>
      <Caption>
        <Description>{description}</Description>
        <Hashtags>{hashtags}</Hashtags>
      </Caption>
    </Container>
  );
}

ProgramList.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    hashtags: PropTypes.string,
    isLiked: PropTypes.bool.isRequired,
    likeCount: PropTypes.number.isRequired,
    
  };
  export default ProgramList;