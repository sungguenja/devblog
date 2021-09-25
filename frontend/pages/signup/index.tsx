// custom hook
import useGetCookie from '../../hooks/useGetCookie';

const index = () => {
  const csrf_token = useGetCookie('csrftoken');
  const session_token = useGetCookie('sessionid');
  // 밑에 회원정보 수정을 위한 상태 정보 제공
};

export default index;