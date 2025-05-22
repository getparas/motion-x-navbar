import Container from "@/components/container";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-start">
      <Container className="min-h-[200vh] px-10 md:pt-20 md:pb-10">
        <div className="mt-24 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-neutral-800 md:text-5xl dark:text-neutral-100">
            Motion X Navbar
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-300">
            A beautiful, animated navbar built with Next.js, Tailwind CSS, and
            Motion. Scroll down to see the navbar animation in action!
          </p>
        </div>
      </Container>
    </div>
  );
}
