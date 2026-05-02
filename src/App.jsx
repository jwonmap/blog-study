import Header from './components/Header';
import PostItem from './components/PostItem';
import './App.css';

import useFetchPosts from './hooks/useFetchPosts';
import useFetchUsers from './hooks/useFetchUsers';


function App() {
  //useFetchPosts 커스텀 훅이 반환하는 값 불러오기 구조분해할당으로
  const {posts, isPostsLoading, isPostsError} = useFetchPosts();
  //useFetchUsers 커스텀 훅이 반환하는 값 불러오기
  const {users, isUsersLoading, isUsersError} = useFetchUsers();


  //로딩 중일때 아래 리턴(로딩중..)이 실행되고, -> 데이터 다 받아서 setIsPostsLoading(false); 됐을 때 본격 아래 앱 컴포넌트 리턴 실행
  if (isPostsLoading || isUsersLoading) {
    return (
      <div className="blogContainer">
        <Header />
        <div>로딩 중입니다...</div>
      </div>
    );
  }

  //에러일때 아래 리턴(로딩중..)이 실행
  if (isPostsError || isUsersError) {
    return (
      <div className="blogContainer">
        <Header />
        <div>에러가 일어났습니다...</div>
        <br />
        <div>새로고침을 해주세요...</div>
      </div>
    );
  }

  return (
    <div className="blogContainer">
      <Header />
      {posts.map(({id, title, body, userId}) => {
        // map 안에는 내가 데이터에서 가져와 쓸 애들 구조분해할당

        const user = users.find((user) => user.id === userId);
        //find 메서드: 배열 내에서 조건식을 만족하는 엘리먼트 찾아서 반환하는 역할. 유저스의 유저아이디가 포스트작성한 유저아이디와 동일한걸 찾아라.
        console.log(user);
        //자 그럼 이 user에서 우리가 쓸 데이터는 username, email인걸 확인할 수 있음 그럼 이제 아래 포스트아이템에 프롭 업뎃해줌

        return <PostItem key={id} title={title} body={body} username={user.username} email={user.email} />;
        //이러면 저장된 posts 갯수만큼 화면에 블로그 컴포넌트 그려짐
        // key 값 필수로 필요하니까 구분할 유일한 값인 id로 명시
        // porps로 타이틀, 바디 / user 배열의 username, email 데이터 값 가져오게 해줌
      })}
    </div>
  )
}

export default App
