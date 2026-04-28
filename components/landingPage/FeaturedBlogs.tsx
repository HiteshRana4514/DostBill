"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import BlogCard from "../BlogCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const blogPosts = [
    {
        id: 1,
        title: "10 Tips to Split Bills Fairly Among Friends",
        excerpt: "Learn the best practices for splitting expenses without creating awkward situations or losing friendships.",
        image: undefined, // No image - will show icon
        category: "Tips & Tricks",
        date: "Apr 15, 2026",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "How UPI Changed Group Expense Management in India",
        excerpt: "Discover how UPI revolutionized the way Indians settle debts and manage group expenses.",
        image: undefined, // No image - will show icon
        category: "Technology",
        date: "Apr 12, 2026",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "The Ultimate Guide to Managing Trip Expenses",
        excerpt: "Planning a group trip? Here's everything you need to know about tracking and splitting travel costs.",
        image: undefined, // No image - will show icon
        category: "Travel",
        date: "Apr 10, 2026",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Roommate Finance 101: Avoiding Money Conflicts",
        excerpt: "Essential tips for managing shared expenses with roommates and maintaining healthy relationships.",
        image: undefined, // No image - will show icon
        category: "Lifestyle",
        date: "Apr 8, 2026",
        readTime: "4 min read"
    },
    {
        id: 5,
        title: "Why Splitwise Users Are Switching to DostBill",
        excerpt: "Real stories from users who made the switch and never looked back. Find out what makes DostBill different.",
        image: undefined, // No image - will show icon
        category: "Case Study",
        date: "Apr 5, 2026",
        readTime: "8 min read"
    }
];

export default function FeaturedBlogs() {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="py-20 bg-surface-main px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-text-main mb-3">
                            Featured Blogs
                        </h2>
                        <p className="text-lg text-text-muted max-w-2xl">
                            Tips, guides, and insights to help you manage group expenses like a pro.
                        </p>
                    </div>

                    {/* Custom Navigation Buttons */}
                    <div className="flex gap-3 mt-6 md:mt-0">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm group"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-secondary transition-all shadow-md group"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Swiper Slider */}
                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                    }}
                    className="pb-12!"
                >
                    {blogPosts.map((post) => (
                        <SwiperSlide key={post.id}>
                            <BlogCard
                                title={post.title}
                                excerpt={post.excerpt}
                                image={post.image}
                                category={post.category}
                                date={post.date}
                                readTime={post.readTime}
                                onClick={() => console.log(`Clicked blog: ${post.title}`)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* View All Button */}
                <div className="text-center mt-8">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-secondary transition-colors"
                    >
                        View all articles
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
