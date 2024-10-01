import { Avatar, Typography, Link } from "@mui/material";
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
    {
      key: "html_url",
      header: "Profile",
      render: ({ html_url, login }) => (
        <Link href={html_url} target="_blank" rel="noopener noreferrer">
          {login}'s GitHub
        </Link>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: ({ type }) => <Typography>{type}</Typography>,
    },
    {
      key: "site_admin",
      header: "Admin",
      render: ({ site_admin }) => (
        <Typography>{site_admin ? "Yes" : "No"}</Typography>
      ),
    },
    {
      key: "score",
      header: "Score",
      render: ({ score }) => <Typography>{score.toFixed(2)}</Typography>,
    },
  ];

  return <BaseTable columns={columns} rows={data} isLoading={isLoading} />;
};
