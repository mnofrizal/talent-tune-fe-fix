"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  X,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";

// Mock data for slides
const slides = [
  {
    id: 1,
    title: "Slide 1",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0001.jpg`,
  },
  {
    id: 2,
    title: "Slide 2",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0002.jpg`,
  },
  {
    id: 3,
    title: "Slide 3",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0003.jpg`,
  },
  {
    id: 4,
    title: "Slide 4",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0004.jpg`,
  },
  {
    id: 5,
    title: "Slide 5",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0005.jpg`,
  },
  {
    id: 6,
    title: "Slide 6",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0006.jpg`,
  },
  {
    id: 7,
    title: "Slide 7",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0007.jpg`,
  },
  {
    id: 8,
    title: "Slide 8",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0008.jpg`,
  },
  {
    id: 9,
    title: "Slide 9",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0009.jpg`,
  },
  {
    id: 10,
    title: "Slide 10",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0010.jpg`,
  },
  {
    id: 11,
    title: "Slide 11",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0011.jpg`,
  },
  {
    id: 12,
    title: "Slide 12",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0012.jpg`,
  },
  {
    id: 13,
    title: "Slide 13",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0013.jpg`,
  },
  {
    id: 14,
    title: "Slide 14",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0014.jpg`,
  },
  {
    id: 15,
    title: "Slide 15",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0015.jpg`,
  },
  {
    id: 16,
    title: "Slide 16",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0016.jpg`,
  },
  {
    id: 17,
    title: "Slide 17",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0017.jpg`,
  },
  {
    id: 18,
    title: "Slide 18",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0018.jpg`,
  },
  {
    id: 19,
    title: "Slide 19",
    image: `/slides/PPT INOVASI SDM TALENT TUNE_page-0019.jpg`,
  },
];

// Mock data for users
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    isMuted: false,
    isVideoOff: false,
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    isMuted: true,
    isVideoOff: false,
  },
  {
    id: 3,
    name: "Charlie Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    isMuted: false,
    isVideoOff: true,
  },
  {
    id: 4,
    name: "Diana Ross",
    avatar: "/placeholder.svg?height=40&width=40",
    isMuted: true,
    isVideoOff: true,
  },
];

export default function SlideshowPresenter() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const mainSlideRef = useRef(null);
  const navigationTimeoutRef = useRef(null);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mainSlideRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (isFullscreen) {
        if (event.key === "ArrowRight" || event.key === " ") {
          goToNextSlide();
        } else if (event.key === "ArrowLeft") {
          goToPreviousSlide();
        } else if (event.key === "Escape") {
          document.exitFullscreen();
        }
        setShowNavigation(true);
        if (navigationTimeoutRef.current) {
          clearTimeout(navigationTimeoutRef.current);
        }
        navigationTimeoutRef.current = setTimeout(
          () => setShowNavigation(false),
          3000
        );
      }
    },
    [isFullscreen, goToNextSlide, goToPreviousSlide]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-background p-4 text-foreground">
      {/* Header */}

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Slides section */}
        <section className="flex flex-grow flex-col overflow-hidden">
          <div className="flex flex-grow items-center justify-center overflow-hidden bg-background p-4">
            <div
              ref={mainSlideRef}
              className="relative h-0 w-full"
              style={{ paddingTop: "56.25%" }} // 16:9 aspect ratio
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="absolute left-0 top-0 h-full w-full rounded-xl object-contain"
              />
              {isFullscreen && showNavigation && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center space-x-2 rounded-full bg-black bg-opacity-50 p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToPreviousSlide}
                  >
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </Button>
                  <span className="text-sm text-white">
                    {currentSlide + 1} / {slides.length}
                  </span>
                  <Button variant="ghost" size="icon" onClick={goToNextSlide}>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="border-t p-2">
            <div className="mb-2 flex items-center justify-center space-x-2">
              <Button variant="ghost" size="icon" onClick={goToPreviousSlide}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Select
                value={currentSlide.toString()}
                onValueChange={(value) => setCurrentSlide(parseInt(value))}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select a slide" />
                </SelectTrigger>
                <SelectContent>
                  {slides.map((slide, index) => (
                    <SelectItem key={slide.id} value={index.toString()}>
                      {slide.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" onClick={goToNextSlide}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>
            </div>
            <ScrollArea className="h-20">
              <div className="flex justify-center space-x-2 p-1">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    className={`focus:outline-none rounded-lg overflow-hidden ${
                      index === currentSlide ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-14 w-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </section>

        {/* User section */}
        <section className="flex w-64 flex-col overflow-hidden border-l bg-background p-4">
          <h2 className="mb-4 text-sm font-semibold text-muted-foreground">
            Participants ({users.length})
          </h2>
          <ScrollArea className="flex-grow">
            {users.map((user) => (
              <div key={user.id} className="mb-5 flex items-center space-x-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">{user.name}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </section>
      </div>
    </div>
  );
}
