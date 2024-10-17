import Profile from ".././page"

type Props = {
  params: {
    id: string
  }
}

const ProfilePage = (props: Props) => {
  return <Profile params={props.params} />
}

export default ProfilePage
