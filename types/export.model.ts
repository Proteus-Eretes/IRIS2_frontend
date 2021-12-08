export enum ExportType {
	RESULTS = 'results',
	LOTTERY = 'lottery',
	REGISTRATIONS = 'registrations',

	EXPORT_FUNCTION_RESULTS = 'results',
	EXPORT_FUNCTION_LOTTERY = 'lottery',
	EXPORT_FUNCTION_WEIGH_IN = 'weighin',
	EXPORT_FUNCTION_REGISTRATIONS = 'registrations',

	EXPORT_TEMPLATE_RESULTS = 'results',
	EXPORT_TEMPLATE_LOTTERY = 'lottery',
	EXPORT_TEMPLATE_WEIGH_IN = 'weighin',
	EXPORT_TEMPLATE_REGISTRATIONS = 'registrations',
}

export enum ResultPrintType {
    ALL = 0,
    WINNERS = 1,
}

export enum ResultType {
	DISABLED = 0,
	DEFAULT = 1,
	ALL_ROUND = 2,
	BEST_RESULT = 3,
	KNOCKOUT = 4,
}
