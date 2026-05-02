//use00 사용하는 함수를 훅이라고 부르는데, 이 훅을 커스텀해서 쓸 수 있음. 코드/데이터 간략화
//커스텀 훅 만들때 규칙
// 1. 항상 use로 시작
// 2. use 다음은 대문자

import { useState, useEffect } from "react";

const USERS_URL = "https://jsonplaceholder.typicode.com/users"; //유저정보 더미서버

function useFetchUsers() {
  //자 이제 불러온 유저 정보를 스테이트에 저장해서, 저장된 스테이트를 이용해 포스트아이템 컴포넌트를 동적으로 렌더해보자
  const [users, setUsers] = useState([]);
  //로딩 처리
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  //에러 처리
  const [isUsersError, setIsUsersError] = useState(false);

  // fetch(POSTS_URL); //이렇게 쓰면 업데이트 될때마다 리렌더되면서 서버 불필요하게 낭비하니까 useEffect로 마운트 될때 한번만 페치 요청가게 해야함
  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsUsersLoading(true); //데이터 받아오는 시작점인 여기서 호출
        const response = await fetch(USERS_URL);
        const json = await response.json();
        setUsers(json);
        setIsUsersLoading(false); //데이터 다 받아와서 셋포스트 다 셋팅되고 나면 로딩이 false가 되는 구조
      } catch {
        setIsUsersError(true); //에러 알려주고
        setIsUsersLoading(false); //로딩도 해결 안되고 false인 채로
      }
    }
    fetchUsers();
  }, []) //의존성 배열 비워둬서 첫번째 이펙트 함수가 앱 컴포넌트 마운트될때 최초 한번만 실행됨
  //그리고 패치유저스 함수 만들어서 서버 안의 데이터 정보 불러옴: 서버 정보 프로미스로 받아오고 -> 바디 안의 필요한 데이터 json()으로 불러옴

  return {
    users,
    isUsersLoading,
    isUsersError,
  };
}

export default useFetchUsers;