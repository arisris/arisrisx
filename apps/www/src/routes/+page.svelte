<script lang="ts">
  let {} = $props();
</script>

<svelte:head>
  <title>Aris Riswanto</title>
  <meta name="description" content="Jamstack Web Developer" />
</svelte:head>

<div class="flex flex-col min-h-screen bg-gray-50 text-gray-800">
  <header class="bg-white/80 backdrop-blur-md sticky top-0 z-10">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <a href="/" class="text-2xl font-bold">Aris Riswanto</a>
        <nav class="hidden md:flex items-center space-x-6">
          <a href="/guestbook" class="hover:text-blue-600 flex items-center space-x-2">
            <span class="icon-[ri--book-2-line]"></span>
            <span>Guestbook</span>
          </a>
          <a href="/code" class="hover:text-blue-600 flex items-center space-x-2">
            <span class="icon-[ri--code-s-slash-line]"></span>
            <span>Code Snippet</span>
          </a>
          <a href="/tools" class="hover:text-blue-600 flex items-center space-x-2">
            <span class="icon-[ri--tools-line]"></span>
            <span>Dev Tools</span>
          </a>
        </nav>
      </div>
    </div>
  </header>

  <main class="flex-grow container mx-auto px-4 py-16 text-center">
    <div class="max-w-2xl mx-auto">
      <img
        src="https://avatars.githubusercontent.com/u/62107426?v=4"
        alt="Aris Riswanto"
        class="w-32 h-32 rounded-full mx-auto mb-6"
      />
      <h1 class="text-4xl font-bold mb-2">Aris Riswanto</h1>
      <p class="text-xl text-gray-600 mb-6">Jamstack Web Developer</p>
      <p class="text-lg mb-8">
        I am a father of one kids, I started learning programming languages
        since 2009. Actually I don't have an IT education background but I was
        very enthusiastic about learning programming languages from that time
        until now. I was born 30 years ago in Majalengka, And now I live with my
        family in Ciamis.
      </p>
      <a
        href="https://github.com/arisris"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Explore Me
      </a>
    </div>
  </main>

  <section class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">My Work At Github</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Replace with actual data fetching later -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="font-bold">arisris/arisrisx</h3>
          <p class="text-gray-600">Personal website.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="font-bold">arisris/ablog</h3>
          <p class="text-gray-600">AI Blog.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="font-bold">arisris/next-toko</h3>
          <p class="text-gray-600">
            Next.js + Tailwind + Prisma + NextAuth + Trpc = Fullstack
          </p>
        </div>
      </div>
      <div class="text-center mt-8">
        <a
          href="https://github.com/arisris"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:underline"
        >
          See More»
        </a>
      </div>
    </div>
  </section>

  <footer class="text-center py-6 bg-white">
    <p class="text-gray-600">
      © {new Date().getFullYear()} Aris Riswanto, Hosted at: Vercel
    </p>
  </footer>
</div>
