import withAuth from "../components/hocs/withAuth";

const MainPage = () => {
  return (
    <div>
      <h1>Main Page</h1>
    </div>
  );
}

export const MainPageWithAuth = withAuth(MainPage);