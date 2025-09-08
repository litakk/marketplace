export default function BlockedPage() {
  return (
    <div className="h-screen bg-white text-black flex items-center justify-center">
      <div className="text-center space-y-8 px-6">
        {/* Заголовок в стиле luxury */}
        <h1 className="text-5xl md:text-6xl font-serif tracking-wide uppercase">
          Вы заблокированы
        </h1>

        {/* Подзаголовок минималистичный */}
        <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
          Доступ к вашему аккаунту ограничен. Свяжитесь с поддержкой для
          получения дополнительной информации.
        </p>
      </div>
    </div>
  );
}
