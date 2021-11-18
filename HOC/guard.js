import Router from "next/router"

const Guard = (Component) => {
  const Result = (props) => {
    if(typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      if(!token) {
        alert('harap login terlebih dahulu');
        Router.replace('/login');
        return null;
      }
      return (
        <>
          <Component {...props} />
        </>
      );
    }
    return null;
  };
  return Result;
};

export default Guard