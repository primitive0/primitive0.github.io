Я решил, что буду публиковать сюда свои решения различных задач. Решения (позже) будут скрыты под спойлерами.


### Задача №1
Рассмотрим случайный телефонный номер.
Какова вероятность того, что среди трёх последних цифр этого номера хотя бы две цифры одинаковы?

**Решение:** \
Рассмотрим телефонный номер длиною $n \ge 3$.
Определим множество элементарных событий $S$:
$$S = \{(s_1, ..., s_n)\ \mid s_k \in \lbrack 0, 9 \rbrack \}$$
Пусть событие A - &laquo;среди трёх последних цифр номера хотя бы две цифры одинаковы&raquo;.
Вероятность события A можно посчитать так:
$$P(A) = \frac{\lvert A \rvert}{\lvert S \rvert}$$
Так как цифр 10, очевидно, что $\lvert S \rvert = 10^n$.

Теперь найдём $\lvert A \rvert$.
Рассмотрим варианты окончания номера. Конец номера может состоять как из трёх одинаковых
цифр, так и из двух одинаковых цифр и одной отличной.
Получается, что количество окончаний номера &mdash; сумма этих вариантов.
Существует всего 10 способов окончить номер тремя одинаковыми цифрами.
С окончанием из двух одинаковых цифр ситуация интереснее. Есть $10 \cdot 9$ вариантов
составить окончание вида XXY. 10 вариантов выбрать X и 9 вариантов выбрать Y при выбранном X, так как X не должен быть Y.
Ещё надо учитывать, что одинаковые и неодинаковая цифры могут меняться местами. Число перестановок в данном случае равно
$C^2_3$. Всего получается $10 + C^2_3 \cdot 10 \cdot 9 = 280$ вариантов окончаний.
Мы нашли количество окончаний номера, которые удовлетворяют условию. Тогда же, количество номеров, которые удовлетворяют условию,
равно $10^{n-3} \cdot 280$.

$$P(A) = \frac{\lvert A \rvert}{\lvert S \rvert} = \frac{10^{n-3} \cdot 280}{10^n} = \frac{280}{1000} = 0.28$$
Ответ к задаче действительно $0.28$.

Это был первый способ решения. Он больше комбинаторный и... Жирный, к сожалению.

Поэтому я предлагаю рассмотреть другой способ. Поразмышляем над событием $A^C$.

$A$ &mdash; &laquo;среди трёх последних цифр номера хотя бы две цифры одинаковы&raquo;.
Переформулируем: &laquo;среди трёх последних цифр есть одинаковые цифры&raquo;. Действительно,
одна цифра не может быть одинаковой. Для &laquo;одинаковости&raquo; нужно как минимум две цифры.
Значит, $A^C$ &mdash; &laquo;среди трёх последних цифр нет одинаковых цифр&raquo;.
А значит, $\lvert A \rvert = 10^{n-3} \cdot (10 \cdot 9 \cdot 8)$.
$$P(A) = 1 - P(A^C) = 1 - \frac{10^{n-3} \cdot (10 \cdot 9 \cdot 8)}{10^n} = 1 - \frac{10 \cdot 9 \cdot 8}{10^3}$$
$$P(A) = 1 - \frac{720}{1000} = 1 - 0.72 = 0.28$$

Итог? Нужно помнить про то, что существует противоположное событию $A$ событие $A^C$, вероятность которого может быть легче найти.

Ещё в этом решении я слишком уж формализовал всю задачу и рассмотрел её с точки зрения вероятностного пространства.
Это, в общем-то, необязательно. Особенно, когда задачу надо решить быстро.
Дополню также, что можно рассматривать только конец номера. Ведь конец номера никак не зависит от выбора цифр в самом номере.
Таким образом, задачу можно было решить проще: $P(A) = 1 - \frac{10 \cdot 9 \cdot 8}{10^3}$.

### Задача №2

На рок-фе­сти­ва­ле вы­сту­па­ют груп­пы &mdash; по одной от каж­дой из за­яв­лен­ных стран.
По­ря­док вы­ступ­ле­ния опре­де­ля­ет­ся жре­би­ем.
Ка­ко­ва ве­ро­ят­ность того, что груп­па из Дании будет вы­сту­пать после груп­пы из Шве­ции и после груп­пы из Нор­ве­гии?

**Решение:** \
Сначала решим эту задачу более формально, а потом посмотрим на упрощения решения.
Будем обозначать группы числами, а выбранный порядок выступления записывать в кортежи.
$$S = \{(s_1, ..., s_n)\ \mid s_k \in \{1, ..., n\}; \; s_i \ne s_j, i \ne j \}$$
Раз есть три команды, с которыми мы работаем, то необходимо учесть, что $n \ge 3$.

Обозначим Норвегию, Швецию и Данию числами 1, 2 и 3 соответственно.

A &mdash; &laquo;число 3 находится после чисел 2 и 1&raquo;.

$\lvert S \rvert$ найти легко:
$$\lvert S \rvert = n!$$

$\lvert A \rvert$ найти уже немножнко сложнее. Для начала найдём количество способов расположить 3 страны в списке.
Это то же самое, что и количество способов выбрать 3 места из n мест. Это количество равняется $C^3_n$.
Ещё надо помнить, что нам всё равно, что идёт первее: 1 или 2. Могут существовать и $(1, 2, 3)$, и $(2, 1, 3)$. Поэтому
нужно удвоить количество вариантов умножением $C^3_n$ на 2. И, наконец, всё это нужно также домножить на
$(n - 3)!$, потому что нужно учесть перестановки остальных элементов.
Посчитаем $P(A)$:
$$P(A) = \frac{2 C^3_n (n - 3)!}{n!} = \frac{2 \frac{n(n-1)(n-2)}{3!} (n - 3)!}{n!} = \frac{1}{3} \approx 0.33$$

Можно упросить задачу, если понимать, что на самом деле остальные страны никак не влияют
на вероятность. Как бы 3 страны между остальными не вставали, существует всего $3!$ способов поменять их местами
между друг другом. Поэтому $P(A) = \frac{2!}{3!} = \frac{1}{3}$.
