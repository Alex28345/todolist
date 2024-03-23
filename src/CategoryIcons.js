import CategoryIcon from "./CategoryIcon";

function CategoryIcons({ categories }) {
    return (
        <div>
            {categories.map((category, index) => (
                <CategoryIcon key={index} category={category} />
            ))}
        </div>
    );
}

export default CategoryIcons;