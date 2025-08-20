import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {}

const Faq: React.FC<Props> = () => {
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-[85%] xl:w-[75%] 2xl:w-[50%] mx-auto mt-15 mb-15 md:mt-20 md:mb-20 lg:mt-24 lg:mb-24 xl:mt-28 xl:mb-28 2xl:mt-32 2xl:mb-32"
      >
        <p className="text-2xl font-bold text-center">FAQ</p>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-extrabold text-[18px] cursor-pointer text-[#171212]">
            Как выбрать нужный размер?
          </AccordionTrigger>
          <AccordionContent className="font-medium text-[16px] text-[#171212]">
            Мы рекомендуем воспользоваться таблицей размеров, размещённой на
            каждой странице товара. Если вы сомневаетесь, свяжитесь с нами — мы
            поможем подобрать оптимальный вариант.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="font-extrabold text-[18px] cursor-pointer text-[#171212]">
            Как осуществляется доставка?
          </AccordionTrigger>
          <AccordionContent className="font-medium text-[16px] text-[#171212]">
            Мы доставляем по всей стране через надёжные службы доставки. Сроки
            зависят от вашего региона и обычно составляют 2–5 рабочих дней.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="font-extrabold text-[18px] cursor-pointer text-[#171212]">
            Какие способы оплаты вы принимаете?
          </AccordionTrigger>
          <AccordionContent className="font-medium text-[16px] text-[#171212]">
            Вы можете оплатить заказ онлайн с помощью: Банковской карты (Visa /
            Mastercard) Apple Pay / Google Pay PayPal
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="font-extrabold text-[18px] cursor-pointer text-[#171212]">
            Можно ли вернуть товар?
          </AccordionTrigger>
          <AccordionContent className="font-medium text-[16px] text-[#171212]">
            Да, вы можете оформить возврат в течение 14 дней после получения,
            если товар не был в носке и сохранил товарный вид. Подробнее читайте
            на странице Политики возврата.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="font-extrabold text-[18px] cursor-pointer text-[#171212]">
            Можно ли стирать одежду в машине?
          </AccordionTrigger>
          <AccordionContent className="font-medium text-[16px] text-[#171212]">
            Инструкции по уходу указаны на ярлыке каждого изделия. В большинстве
            случаев машинная стирка допустима при 30°C без отжима.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="font-extrabold text-[18px] cursor-pointer text-[#171212]">
            Что делать, если я получил бракованный товар?
          </AccordionTrigger>
          <AccordionContent className="font-medium text-[16px] text-[#171212]">
            Пожалуйста, свяжитесь с нашей службой поддержки через форму обратной
            связи или по email, и мы немедленно решим проблему.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger className="font-extrabold text-[18px] cursor-pointer text-[#171212]">
            Как я узнаю, что мой заказ принят?
          </AccordionTrigger>
          <AccordionContent className="font-medium text-[16px] text-[#171212]">
            После оформления заказа вы получите email с подтверждением. Как
            только заказ будет отправлен — мы пришлём вам трек-номер для
            отслеживания.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Faq;
