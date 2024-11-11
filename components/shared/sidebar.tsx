'use client';

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { TemplateCard } from "./template-card";
import { useComponents } from "@/context/component-context";
import { templates } from "@/config/templates";

interface SectionItem {
  id: string;
  title: string;
  imageUrl?: string;
}

interface Section {
  title: string;
  items: SectionItem[];
}

const sections: Section[] = [
  {
    title: "Templates",
    items: [
      { 
        id: "ebook", 
        title: "Ebook Template",
        imageUrl: "/assets/images/temp.jpg"
      },
      { 
        id: "course", 
        title: "Course Template",
      },
    ]
  },
  {
    title: "Hero Headers",
    items: [
      { 
        id: "hero-1", 
        title: "Image Right + Text Left",
      },
      { 
        id: "hero-2", 
        title: "Two Images + Text",
      },
    ]
  },
  {
    title: "Forms",
    items: [
      { 
        id: "form-1", 
        title: "Contact Form"
      },
      { 
        id: "form-2", 
        title: "Newsletter Subscription"
      },
    ]
  },
  {
    title: "Images",
    items: [
      { 
        id: "image-1", 
        title: "Text + Big Image",
      },
      { 
        id: "image-2", 
        title: "Grid Images + Text",
      },
    ]
  },
  {
    title: "Features",
    items: [
      { 
        id: "features-1", 
        title: "Cozy Link List"
      },
    ]
  },
  {
    title: "Testimonials",
    items: [
      { 
        id: "testimonial-1", 
        title: "Single Testimonial with Image",
      },
      { 
        id: "testimonial-2", 
        title: "Three Text Testimonials"
      },
    ]
  },
]

export default function Sidebar() {
  const [openSections, setOpenSections] = useState<string[]>([])
  const { addComponent, loadTemplate } = useComponents()

  const toggleSection = (title: string) => {
    setOpenSections(prev => 
      prev.includes(title) 
        ? prev.filter(section => section !== title)
        : [...prev, title]
    )
  }

  const handleTemplateClick = (id: string) => {
    // Check if the clicked item is a template
    if (Object.keys(templates).includes(id)) {
      loadTemplate(id)
    } else {
      addComponent(id)
    }
  }

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Added Page Components Label */}
      <div className="p-4 border-b">
        <div className="relative">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-primary/80 to-purple-600/80 text-transparent bg-clip-text">
            Page Components
          </h2>
          <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 to-purple-600/60" />
        </div>
      </div>

      {/* Sections with scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sections.map((section) => (
          <div key={section.title}>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-2 font-medium"
              onClick={() => toggleSection(section.title)}
            >
              {section.title}
              {openSections.includes(section.title) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

            {openSections.includes(section.title) && (
              <div className="mt-2 space-y-3">
                {section.items.map((item) => (
                  <TemplateCard
                    key={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl}
                    onClick={() => handleTemplateClick(item.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden fixed left-4 top-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar - now fixed */}
      <div className="hidden lg:block fixed left-0 top-0 w-[300px] border-r bg-background h-screen">
        <SidebarContent />
      </div>
      {/* Spacer div to offset the fixed sidebar */}
      <div className="hidden lg:block w-[300px]" />
    </>
  )
}