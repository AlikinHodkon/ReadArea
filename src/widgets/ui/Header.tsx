import { Link } from 'react-router'

export const Header = () => {
  return (
    <div className='flex gap-4 font-ubuntu text-white bg-linear-to-br from-[#A2B2FC] to-[#FFF1BE] items-center border-b h-20 px-4 shadow-md'>
      <Link to={'/'}>Main page</Link>
      <Link to={'/profile'}>Profile</Link>
    </div>
  )
}
