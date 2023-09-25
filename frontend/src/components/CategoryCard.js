 
const CategoryCard = ({title,handleClick}) => {
  return (
     <div className="category-card" onClick={()=>handleClick(title)}>
         {title}
      </div>
  )
}

export default CategoryCard
