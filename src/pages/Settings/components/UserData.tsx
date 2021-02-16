import { User } from "../../../components/EntityTypes"

export const Name: React.FC<{ user: User | undefined }> = ({ user }) => {
    return (
        <div>{user?.userName}</div>
    )
}

export const Email: React.FC<{ user: User | undefined }> = ({ user }) => {
    return (
        <div>{user?.email}</div>
    )
}