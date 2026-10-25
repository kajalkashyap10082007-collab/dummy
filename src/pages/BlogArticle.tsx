import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { BLOG_ARTICLES, SITE_URL } from '../seo';
import { blogPosts } from '../data';

const articleContent: Record<string, { intro: string; sections: { heading: string; paragraphs: string[] }[] }> = {
  'fall-fashion-trends-2026': {
    intro: 'Building a seasonal wardrobe does not mean buying every new trend. Choose versatile pieces that work together, feel comfortable and suit your everyday routine.',
    sections: [
      {
        heading: '1. Build outfits with versatile basics',
        paragraphs: [
          'Start with wardrobe basics such as plain T-shirts, shirts, jeans and comfortable trousers. Neutral colours are easy to combine, while one brighter colour can add personality.',
          'Before purchasing something new, consider whether it works with at least two or three pieces you already own.'
        ]
      },
      {
        heading: '2. Use comfortable layers',
        paragraphs: [
          'Layering helps you adapt to changing temperatures. Try a T-shirt under an open shirt, or combine a top with a light jacket when the weather calls for it.',
          'Choose breathable inner layers and make sure outer layers allow you to move comfortably.'
        ]
      },
      {
        heading: '3. Choose colours that work together',
        paragraphs: [
          'Black, navy, beige, white and brown can form a useful colour base. Add seasonal colours through a shirt, scarf or other accessory rather than replacing your entire wardrobe.'
        ]
      },
      {
        heading: '4. Focus on fit and comfort',
        paragraphs: [
          'A simple outfit can look polished when the fit is right. Check shoulder seams, sleeve length and trouser length, and choose fabrics that feel comfortable for the occasion.'
        ]
      },
      {
        heading: '5. Make more of the clothes you own',
        paragraphs: [
          'Try new combinations before shopping. Caring for clothing according to its care label and repairing small problems can also help extend the life of your favourite pieces.'
        ]
      }
    ]
  },
  'sustainable-fashion-why-it-matters': {
    intro: 'Sustainable fashion is about making more thoughtful clothing choices. No single purchase makes a wardrobe sustainable, but everyday habits can help reduce unnecessary buying and clothing waste.',
    sections: [
      {
        heading: '1. Buy with a plan',
        paragraphs: [
          'Before buying an item, think about where you will wear it and what you already own. A useful purchase should suit your needs and work with other pieces in your wardrobe.'
        ]
      },
      {
        heading: '2. Look for durability',
        paragraphs: [
          'Check stitching, seams, fastenings and fabric care instructions. Clothing that suits your routine and can be maintained easily may remain useful for longer.'
        ]
      },
      {
        heading: '3. Rewear and restyle outfits',
        paragraphs: [
          'Combine a familiar shirt with different trousers, layer a basic top or use accessories to change the look. Repeating outfits is practical and can reduce pressure to buy something new for every occasion.'
        ]
      },
      {
        heading: '4. Care for clothes properly',
        paragraphs: [
          'Follow garment care labels, avoid unnecessary washing when appropriate, and repair loose buttons or small tears. Proper care can help clothing stay wearable for longer.'
        ]
      },
      {
        heading: '5. Give unwanted clothes another use',
        paragraphs: [
          'Consider repairing, donating, swapping or responsibly recycling clothes that you no longer need. Choose an option that suits the condition of the garment and local facilities.'
        ]
      }
    ]
  },
  'style-a-classic-white-tshirt': {
    intro: 'A white T-shirt is a versatile wardrobe basic. With a few simple changes to the layers, bottoms and accessories, you can create different outfits without making styling complicated.',
    sections: [
      {
        heading: '1. Pair it with classic jeans',
        paragraphs: [
          'Wear a white T-shirt with blue or black jeans for a simple everyday outfit. Choose a fit that feels comfortable and finish with clean sneakers or shoes you already own.'
        ]
      },
      {
        heading: '2. Add an open shirt',
        paragraphs: [
          'Layer an unbuttoned shirt over the T-shirt for extra colour and texture. This combination works well for casual outings and gives a basic outfit more dimension.'
        ]
      },
      {
        heading: '3. Create a smart casual look',
        paragraphs: [
          'Combine a well-fitting white T-shirt with tailored trousers and a neat outer layer. Keep the colours coordinated for a simple, polished appearance.'
        ]
      },
      {
        heading: '4. Try a relaxed weekend outfit',
        paragraphs: [
          'Pair the T-shirt with comfortable trousers or shorts, depending on the weather and occasion. Keep the fit balanced so the outfit feels easy to wear.'
        ]
      },
      {
        heading: '5. Finish with simple accessories',
        paragraphs: [
          'A belt, watch, tote bag or understated jewellery can personalise the outfit. Choose accessories that suit your style rather than adding too many items at once.'
        ]
      }
    ]
  }
};

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = BLOG_ARTICLES.find((item) => item.slug === slug);
  const content = slug ? articleContent[slug] : undefined;
  const post = article && blogPosts.find((item) => item.id === article.postId);

  if (!article || !content || !post) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16">
        <SEO
          title="Article Not Found | Clothify"
          description="This Clothify fashion article could not be found. Browse our fashion tips and styling guides."
          noIndex
        />
        <h1 className="text-3xl font-bold mb-4">Article not found</h1>
        <Link to="/sustainable-fashion-blog" className="underline">
          Browse all fashion articles
        </Link>
      </main>
    );
  }

  const canonicalUrl = `${SITE_URL}${article.path}`;

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: post.image,
    datePublished: new Date(post.date).toISOString().slice(0, 10),
    mainEntityOfPage: canonicalUrl,
    author: {
      '@type': 'Organization',
      name: 'Clothify'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Clothify',
      url: SITE_URL
    }
  });

  return (
    <main className="bg-white min-h-screen">
      <SEO
        title={article.title}
        description={article.description}
        canonicalUrl={canonicalUrl}
        ogType="article"
        ogImage={post.image}
        schemaMarkup={schema}
      />

      <article className="max-w-3xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 mb-8">
          <Link to="/" className="hover:underline">Home</Link>
          {' / '}
          <Link to="/sustainable-fashion-blog" className="hover:underline">Fashion Blog</Link>
          {' / '}
          <span className="text-zinc-800">{post.title}</span>
        </nav>

        <p className="text-sm uppercase tracking-wider text-zinc-500 mb-3">
          {post.category} · {post.date}
        </p>

        <h1 className="text-3xl md:text-5xl font-bold font-serif text-zinc-900 leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-lg text-zinc-600 leading-relaxed mb-8">
          {content.intro}
        </p>

        <img
          src={post.image}
          alt={post.title}
          width="800"
          height="600"
          loading="eager"
          decoding="async"
          className="w-full aspect-[4/3] object-cover rounded-sm mb-10"
        />

        <div className="space-y-8 text-zinc-700 leading-8">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold font-serif text-zinc-900 mb-3">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-3">{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="border-t border-zinc-200 mt-12 pt-8">
          <h2 className="text-2xl font-bold font-serif mb-3">
            Explore the Clothify collection
          </h2>
          <p className="text-zinc-600 mb-5">
            Browse clothing styles and explore options for your everyday wardrobe.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-zinc-900 text-white px-5 py-3 hover:bg-zinc-700"
          >
            Explore clothing
          </Link>
          <p className="mt-6">
            <Link to="/sustainable-fashion-blog" className="underline">
              Back to all fashion articles
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}