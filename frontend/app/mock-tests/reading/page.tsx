'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';

export default function ReadingTestPage() {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 0) {
          clearInterval(timer);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container py-6 max-w-7xl">
      <div className="sticky top-0 bg-background z-10 pb-4 mb-4 border-b">
        <div className="flex justify-between items-center">
          <PageHeader>
            <h1 className="text-3xl font-bold">IELTS Reading Test</h1>
            <p className="text-lg text-muted-foreground">Academic Reading Practice Test</p>
          </PageHeader>
          <div className="text-2xl font-bold">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1 h-[calc(100vh-200px)] overflow-y-auto">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reading Passage 1</h2>
            <div className="prose max-w-none">
              {/* Add your reading passage content here */}
              <p>A. The ping of a text message has never sounded so sweet. In what is being touted as a world first, Kenya’s biggest mobile operator is allowing subscribers to send cash to other phone users by SMS. Known as M-Pesa, or mobile money, the service is expected to revolutionise banking in a country where more than 80% of people are excluded from the formal financial sector. Apart from transferring cash - a service much in demand among urban Kenyans supporting relatives in rural areas - customers of the Safaricom network will be able to keep up to 50,000 shillings (£370) in a “virtual account” on their handsets.

B. Developed by Vodafone, which holds a 35% share in Safaricom, M-Pesa was formally launched in Kenya two weeks ago. More than 10,000 people have signed up for the service, with around 8 million shillings transferred so far, mostly in tiny denominations. Safaricom’s executives are confident that growth will be strong in Kenya, and later across Africa. “We are effectively giving people ATM cards without them ever having to open a real bank account,” said Michael Joseph, chief executive of Safaricom, who called the money transfer concept the “next big thing” in mobile telephony.

C. M-Pesa’s is simple. There is no need for a new handset or SIM card. To send money, you hand over the cash to a registered agent - typically a retailer - who credits your virtual account. You then send between 100 shillings (74p) and 35,000 shillings (£259) via text message to the desired recipient - even someone on a different mobile network - who cashes it at an agent by entering a secret code and showing ID. A commission of up to 170 shillings (£1.25) is paid by the recipient but it compares favourably with fees levied by the major banks, whose services are too expensive for most of the population.

D. Mobile phone growth in Kenya, as in most of Africa, has been remarkable, even among the rural poor. In June 1999, Kenya had 15,000 mobile subscribers. Today, it has nearly 8 million out of a population of 35 million, and the two operators’ networks are as extensive as the access to banks is limited. Safaricom says it is not so much competing with financial services companies as filling a void. In time, M-Pesa will allow people to borrow and repay money, and make purchases. Companies will be able to pay salaries directly into workers’ phones - something that has already attracted the interest of larger employers, such as the tea companies, whose workers often have to be paid in cash as they do not have bank accounts. There are concerns about security, but Safaricom insists that even if someone’s phone is stolen, the PIN system prevents unauthorised withdrawals. Mr. Joseph said the only danger is sending cash to the wrong mobile number and the recipient redeeming it straight away.

E. The project is being watched closely by mobile operators around the world as a way of targeting the multibillion pound international cash transfer industry long dominated by companies such as Western Union and Moneygram. Remittances sent from nearly 200 million migrant workers to developing countries totalled £102 billion last year, according to the World Bank. The GSM Association, which represents more than 700 mobile operators worldwide, believes this could quadruple by 2012 if transfers by SMS become the norm. Vodafone has entered a partnership with Citigroup that will soon allow Kenyans in the UK to send money home via text message. The charge for sending £50 is expected to be about £3, less than a third of what some traditional services charge.</p>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Questions 1-5</h3>
              {/* Add your questions here */}
              <div className="space-y-4">
                <p>Questions will be added here...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}