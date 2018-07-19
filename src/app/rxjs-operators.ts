// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable

// See node_module/rxjs/Rxjs.js
// Import just the rxjs statics and operators needed for THIS app.

// Statics
import { throwError } from 'rxjs';

// Operators
import { catchError, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

