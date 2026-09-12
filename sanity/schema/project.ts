export const project = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "name", title: "Project Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "category", title: "Category", type: "string" },
    { name: "status", title: "Status", type: "string" },
    { name: "location", title: "Location", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "gallery", title: "Gallery", type: "array", of: [{ type: "image" }] },
    { name: "amenities", title: "Amenities", type: "array", of: [{ type: "string" }] },
    { name: "floorPlans", title: "Floor Plans", type: "array", of: [{ type: "image" }] },
    { name: "specifications", title: "Specifications", type: "array", of: [{ type: "string" }] },
    { name: "brochure", title: "Brochure", type: "file" },
    { name: "mapUrl", title: "Google Maps URL", type: "url" }
  ]
};
