const PostItem = ({title, body, username, email}) => {
  //app.jsx에서 포스트아이템 컴포넌트에 프롭으로 지정한 애들 받아와서 이제 아래 애들한테 동적으로 내용 줄수있음
  return (
    <div className="postItem">
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="userInfo">
        <div className="avatar">{username[0]}</div> {/* username의 인덱스 중 첫번째 글자를 가져와서 보여줌 */}
        <div className="username">{username}</div>
        <div className="email">{email}</div>
      </div>
    </div>
  );
}

export default PostItem;