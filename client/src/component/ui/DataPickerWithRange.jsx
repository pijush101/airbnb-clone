import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Button } from '@/component/ui/button';
import { Calendar } from '@/component/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/component/ui/popover';

export default function DataPickerWithRange({ className, setDateRange }) {
    const [date, setDate] = React.useState({
        from: new Date(),
        to: addDays(new Date(), 5),
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    React.useEffect(() => {
        // if user has not selected any date or selected a single date
        if (!date) {
            setDate({ from: new Date(), to: new Date() });
        } else {
            setDateRange(date);
        }
    }, [date]);

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger
                    asChild
                    className="border-none text-black hover:bg-transparent"
                >
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL d, yyyy")} –{' '}
                                    {format(date.to, "LLL d, yyyy")}
                                </>
                            ) : (
                                format(date.from, "LLL d, yyyy")
                            )
                        ) : (
                            <span className="text-base font-semibold">Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        disabled={(d) => d < yesterday}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
