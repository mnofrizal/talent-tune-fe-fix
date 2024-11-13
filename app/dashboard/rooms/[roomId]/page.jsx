"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Maximize, Minimize, ChevronLeft, ChevronRight } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const mockUsers = [
  { id: 1, name: "John Doe", initials: "JD" },
  { id: 2, name: "Jane Smith", initials: "JS" },
  { id: 3, name: "Mike Johnson", initials: "MJ" },
  { id: 4, name: "Emily Brown", initials: "EB" },
];

export default function RoomPage() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isContinued, setIsContinued] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { roomId } = useParams();
  const { toast } = useToast();
  const pdfContainerRef = useRef(null);
  const fullscreenContainerRef = useRef(null);
  const thumbnailsRef = useRef(null);

  useEffect(() => {
    toast({
      title: "Room Joined",
      description: `You've joined room ${roomId}`,
    });
  }, [roomId, toast]);

  useEffect(() => {
    let timer;
    if (isStarted && !isTimeUp) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => {
          if (prevTime + 1 === 60) {
            setIsTimeUp(true);
            return 60;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, isTimeUp]);

  const handleFullscreenChange = useCallback(() => {
    const fullscreenElement = document.fullscreenElement;
    setIsFullscreen(!!fullscreenElement);
    if (fullscreenElement) {
      fullscreenElement.style.backgroundColor = "black";
    } else if (fullscreenContainerRef.current) {
      fullscreenContainerRef.current.style.backgroundColor = "";
    }
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [handleFullscreenChange]);

  const handleStart = useCallback(() => {
    setIsStarted(true);
    setTimeElapsed(0);
    setIsTimeUp(false);
    setIsContinued(false);
  }, []);

  const handleContinue = useCallback(() => {
    setIsTimeUp(false);
    setIsContinued(true);
  }, []);

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen && fullscreenContainerRef.current) {
      if (fullscreenContainerRef.current.requestFullscreen) {
        fullscreenContainerRef.current.requestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, [isFullscreen]);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  const handlePageChange = useCallback(
    (newPageNumber) => {
      setPageNumber((prevPageNumber) => {
        const updatedPageNumber = Math.max(
          1,
          Math.min(newPageNumber, numPages || 1)
        );
        if (thumbnailsRef.current && prevPageNumber !== updatedPageNumber) {
          const thumbnailWidth = 120 + 16; // 120px width + 16px margin
          const scrollPosition = (updatedPageNumber - 1) * thumbnailWidth;
          const scrollableWidth =
            thumbnailsRef.current.scrollWidth -
            thumbnailsRef.current.clientWidth;
          const targetScroll = Math.min(scrollPosition, scrollableWidth);
          thumbnailsRef.current.scrollTo({
            left: targetScroll,
            behavior: "smooth",
          });
        }
        return updatedPageNumber;
      });
    },
    [numPages]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden"
    >
      <div className="flex h-16 items-center justify-between bg-gray-200 px-4">
        {!isStarted ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Start Assessment</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will start the assessment timer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleStart}>
                  Start
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <div>Assessment in progress</div>
        )}
        <div className="flex items-center gap-4">
          <div
            className={`text-xl font-semibold ${
              timeElapsed >= 60 ? "text-red-500" : ""
            }`}
          >
            Time: {formatTime(timeElapsed)}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="rounded-full"
          >
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div 
          className="flex w-4/5 flex-col bg-gray-100" 
          ref={fullscreenContainerRef}
        >
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="relative max-h-full w-full overflow-auto">
              <Document
                file="/sample.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                className="mx-auto"
              >
                <Page
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="mx-auto"
                />
              </Document>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>
                Page {pageNumber} of {numPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea
            className="border-t bg-white p-4"
            orientation="horizontal"
            ref={thumbnailsRef}
          >
            <div className="flex space-x-4">
              {Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`thumb-${index}`}
                  className={`cursor-pointer ${
                    pageNumber === index + 1 ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  <Document file="/sample.pdf">
                    <Page
                      pageNumber={index + 1}
                      width={100}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="w-1/5 border-l bg-white">
          <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">Participants</h2>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {mockUsers.map((user) => (
                <div key={user.id} className="mb-4 flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <span className="ml-3">{user.name}</span>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>

      {isTimeUp && !isContinued && (
        <AlertDialog open={isTimeUp} onOpenChange={setIsTimeUp}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Time's Up!</AlertDialogTitle>
              <AlertDialogDescription>
                The allocated time for this assessment has ended. You may
                continue if needed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleContinue}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </motion.div>
  );
}