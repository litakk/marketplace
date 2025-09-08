import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq: React.FC = () => {
  return (
    <section className="w-full bg-white dark:bg-neutral-950 py-12 md:py-16">
      <div className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
        {/* Заголовок */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-widest uppercase mb-8">
          FAQ
        </h2>

        {/* Аккордеон */}
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border-b border-black/10 pb-3">
            <AccordionTrigger className="text-base font-medium tracking-wide">
              Как выбрать нужный размер?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Мы рекомендуем воспользоваться таблицей размеров, размещённой на
              каждой странице товара. Если сомневаетесь — свяжитесь с нами.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b border-black/10 pb-3">
            <AccordionTrigger className="text-base font-medium tracking-wide">
              Как осуществляется доставка?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Доставка по всей стране через надёжные службы. Обычно 2–5 рабочих
              дней.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b border-black/10 pb-3">
            <AccordionTrigger className="text-base font-medium tracking-wide">
              Какие способы оплаты вы принимаете?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Банковская карта (Visa / Mastercard), Apple Pay, Google Pay,
              PayPal.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b border-black/10 pb-3">
            <AccordionTrigger className="text-base font-medium tracking-wide">
              Можно ли вернуть товар?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Возврат в течение 14 дней, если товар не носили и он сохранил
              товарный вид.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b border-black/10 pb-3">
            <AccordionTrigger className="text-base font-medium tracking-wide">
              Можно ли стирать одежду в машине?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Указано на ярлыке. Обычно допустима стирка при 30°C без отжима.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-b border-black/10 pb-3">
            <AccordionTrigger className="text-base font-medium tracking-wide">
              Что делать, если я получил бракованный товар?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Напишите в поддержку — мы быстро решим проблему.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-b border-black/10 pb-3">
            <AccordionTrigger className="text-base font-medium tracking-wide">
              Как я узнаю, что мой заказ принят?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              После оформления заказа получите email-подтверждение и трек-номер
              при отправке.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
