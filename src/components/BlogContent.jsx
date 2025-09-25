// BlogContent.jsx
import React from 'react'
import Hero from '@/components/Hero'

function BlogContent({ children }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Blog Hero Section */}
      <Hero />

      {/* Blog Article Content */}
      <article className="bg-muted/50 flex-1 rounded-xl p-6">
        {children}
      </article>

      {/* Related / Other Sections */}
      <section className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </section>
    </div>
  )
}

export default BlogContent
