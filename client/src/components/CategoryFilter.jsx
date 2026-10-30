
const categories = [
  "Academic",
  "Course Completion",
  "Internship",
  "Hackathon",
  "Achievement",
  "Workshop & Webinar",
  "Other",
];

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <label htmlFor="category-filter">
        Filter by category
      </label>

      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">All Certificates</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
