class HelperService {
  handleMoneyFormat(
    number: number | null | undefined,
    fraction: number,
    showCurrency: boolean,
    currency: string
  ): string | undefined {
    if (number === null || number === undefined) {
      return;
    }

    const validCurrency: string = !currency ? "NGN" : currency;

    const trimmedCurrency: string = validCurrency?.slice(0, -1);
    const locale: string = `en-${trimmedCurrency}`;

    const options: Intl.NumberFormatOptions = {
      minimumFractionDigits: fraction,
      style: showCurrency ? "currency" : undefined,
      currency: showCurrency ? validCurrency : undefined,
    };

    if (number >= 1000000) {
      options.notation = "compact";
    }

    return new Intl.NumberFormat(locale, options).format(number);
  }

  capitalize(str: string): string {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  }

  capitalizeAll(str: string): string {
    return str
      ? str
          .toLowerCase()
          .split(" ")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";
  }

  hyphenSeparator(str: string): string {
    return str.toLowerCase().replace(/\s+/g, "-");
  }

  isEmptyObject(obj: object) {
    if (obj == null || typeof obj !== "object") return true;
    return Object.keys(obj).length === 0;
  }
}

const helperService = new HelperService();
export default helperService;
