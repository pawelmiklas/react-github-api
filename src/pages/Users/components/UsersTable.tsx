import { Avatar, Typography } from "@mui/material";
import { User } from "../../../types";
import { BaseTable, Column } from "../../../components/BaseTable";

interface UsersTableProps {
  isLoading: boolean;
  data: User[];
}

export const UsersTable = ({ isLoading, data }: UsersTableProps) => {
  const columns: Column<User>[] = [
    {
      key: "avatar_url",
      header: "Avatar",
      render: ({ avatar_url, login }) => (
        <Avatar src={avatar_url} alt={login} />
      ),
    },
    {
      key: "login",
      header: "Username",
      render: ({ login }) => <Typography>{login}</Typography>,
    },
  ];

  return <BaseTable columns={columns} rows={data} isLoading={isLoading} />;
};
