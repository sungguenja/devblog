const useGetCookie = (name: string) => {
  var cookieValue = "test";
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    cookies.forEach((item, index) => {
      var cookie = item.trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        return false;
      }
    });
  }

  return cookieValue;
};

export default useGetCookie;
