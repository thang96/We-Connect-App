import UserCard from "@components/UserCard";

const SearchUserPage = () => {
  return (
    <div className="container flex-col">
      <p>Search</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
};

export default SearchUserPage;
