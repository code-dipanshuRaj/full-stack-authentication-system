export default async function UserProfilePage({ params } : any) {
  const {id} = await params;
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-white text-6xl">UserId <span className="text-6xl p-1 text-black rounded-md bg-orange-500">{id}</span></p>
    </div>
  );
}
