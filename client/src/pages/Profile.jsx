// Components
import Post from "../components/Post"
import useGetProfile from "../hooks/useGetProfile"

const ProfilePage = () => {
	const { posts, username } = useGetProfile()

	return (
		<div className='h-full'>
			{posts ? (
				<div>
					<div className='pb-5 flex flex-col gap-3'>
						<h1 className='text-main-text  text-3xl font-semibold'>{username} Profile</h1>
						<span className='text-second-text'>
							This user uploaded {posts && posts.length} posts
						</span>
					</div>
					<div>
						{posts !== [] ? (
							<div className='grid grid-cols-2 gap-6'>
								{posts.map((post) => (
									<Post key={post._id} {...post} />
								))}
							</div>
						) : (
							<span>This user has no Posts</span>
						)}
					</div>
				</div>
			) : (
				<span>This user does not Exist</span>
			)}
		</div>
	)
}

export default ProfilePage
