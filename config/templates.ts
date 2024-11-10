import { Template } from "@/types/template"

export const templates: Record<string, Template> = {
    'ebook': {
      id: 'ebook',
      components: [
        // Hero section with book preview
        {
          type: 'hero-1',
          initialData: {
            title: "Master Your Skills with Our New eBook",
            subtitle: "Learn from industry experts and take your knowledge to the next level",
            buttonText: "Get the Book",
          }
        },
        // Key features of the book
        {
          type: 'features-1',
          initialData: {
            items: [
              "Comprehensive guide with practical examples",
              "Step-by-step tutorials and exercises",
              "Access to exclusive resources",
              "Regular updates and new content",
              "Community support and discussion"
            ]
          }
        },
        // Single testimonial from a reader
        {
          type: 'testimonial-1',
          initialData: {
            text: "This ebook transformed my understanding of the subject. The practical examples and clear explanations made complex topics easy to grasp.",
            author: "Sarah Mitchell",
            role: "Software Developer"
          }
        },
        // Newsletter signup
        {
          type: 'form-2',
          initialData: {
            title: "Stay Updated",
            subtitle: "Subscribe to receive free chapter samples and updates",
            buttonText: "Subscribe Now",
            placeholder: "Enter your email"
          }
        }
      ]
    },
    'course': {
      id: 'course',
      components: [
        // Course introduction hero
        {
          type: 'hero-2',
          initialData: {
            title: "Transform Your Career with Our Course",
            subtitle: "Learn practical skills from industry experts through hands-on projects and real-world examples",
            buttonText: "Enroll Now"
          }
        },
        // Course features
        {
          type: 'features-1',
          initialData: {
            items: [
              "Live interactive sessions with experts",
              "Hands-on projects and assignments",
              "Personal mentorship and guidance",
              "Industry-recognized certification",
              "Lifetime access to course materials"
            ]
          }
        },
        // Course preview images
        {
          type: 'image-2',
          initialData: {
            title: "What You'll Learn",
            description: "Get a glimpse of our comprehensive course content and interactive learning platform."
          }
        },
        // Student testimonials
        {
          type: 'testimonial-2',
          initialData: {
            testimonials: [
              {
                text: "The course structure and mentorship helped me land my dream job.",
                author: "Alex Chen"
              },
              {
                text: "Best investment in my career. The practical projects were invaluable.",
                author: "Maria Garcia"
              },
              {
                text: "The community and support system made learning enjoyable.",
                author: "James Wilson"
              }
            ]
          }
        },
        // Contact form for inquiries
        {
          type: 'form-1',
          initialData: {
            title: "Have Questions?",
            subtitle: "Get in touch with our team for personalized guidance",
            buttonText: "Send Message"
          }
        }
      ]
    }
  }