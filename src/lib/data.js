import herobg2 from "../public/Home/herobg2.png";

// Sample Product Data
export const productsData = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    brand: `Brand ${index + 1}`,
    category: index % 2 === 0 ? "Shirts" : "Shoes",
    new_price: 25 + index,
    old_price: 30 + index,
    discount: 10,
    image_url: "https://allurebeauty.pk/cdn/shop/products/8964001174424_ad7e922f-06d3-41b7-98f9-19ca71194a6c.jpg?v=1667862242&width=320",
    product_url: "#",
    rating: 4,
    authenticity: index % 2 === 0 ? 1 : 0,
}));

export const reviewsData = [
    {
        name: "Larry Johnson",
        rating: 4.6,
        comment: "Brilliant, thank you for providing quality content!",
        date: "6 days ago",
        likes: 5,
    },
    {
        name: "Warren Mills",
        rating: 5,
        comment: "Everything is awesome!",
        date: "2 weeks ago",
        likes: 12,
    },
    {
        name: "Isobel Whitehead",
        rating: 4.5,
        comment: "Thank you for providing a website that helps us out a lot!",
        date: "3 weeks ago",
        likes: 7,
    },
    {
        name: "Samantha Ray",
        rating: 3.8,
        comment: "Good experience overall, but could be better.",
        date: "1 week ago",
        likes: 3,
    },
    {
        name: "Michael Scott",
        rating: 4.9,
        comment: "Simply the best!",
        date: "5 days ago",
        likes: 20,
    },
];
