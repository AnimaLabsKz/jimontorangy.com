import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/help")({
  component: HelpPage,
});

function HelpPage() {
  return (
    <div className="prose prose-stone max-w-3xl">
      <h1 className="text-display text-2xl font-extrabold">Инструкция для администратора</h1>
      <h2>Новости</h2>
      <p>Создайте новость, заполните slug (латиницей, например <code>jimon-quality-award</code>), укажите URL обложки и переведите заголовок и текст на нужные языки. Активируйте «Опубликовано», чтобы новость появилась на сайте.</p>
      <h2>Бренды и продукция</h2>
      <p>Аналогично новостям. Поле «Позиция» определяет порядок отображения. Для продукции выберите категорию: <code>medicine</code> / <code>supplements</code> / <code>cosmetics</code>.</p>
      <h2>Переводы</h2>
      <p>Если на сайте нужно изменить какую-то надпись, найдите её ключ и поправьте перевод на пяти языках. Изменения попадут в БД и будут видны после обновления страницы.</p>
      <h2>Сообщения</h2>
      <p>Здесь видны все заявки с формы «Контакты». Отметьте обработанные — они станут серыми.</p>
      <h2>Загрузка изображений</h2>
      <p>Загружайте файлы в Lovable Cloud → Storage → bucket <code>media</code>, затем копируйте публичный URL и вставляйте в поле обложки.</p>
    </div>
  );
}
