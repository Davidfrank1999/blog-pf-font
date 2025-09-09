// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-gradient-to-r from-chart-2/10 via-background to-chart-3/10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* Left */}
        <p className="text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-primary">MyBlog</span> — Built with ❤️ using{" "}
          <span className="font-medium text-chart-2">React</span> +{" "}
          <span className="font-medium text-chart-3">Tailwind</span>
        </p>

        {/* Right */}
        <div className="flex items-center gap-6">
          <a
            href="/about"
            className="text-muted-foreground hover:text-primary transition no-underline"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-muted-foreground hover:text-primary transition no-underline"
          >
            Contact
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition no-underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
