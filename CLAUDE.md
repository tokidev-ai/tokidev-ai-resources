
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Data Loading Pattern
Use the resource() API for any async data loading:
- params signal → triggers the load
- defaultValue → what to show before load
- isLoading() / hasValue() / error() for UI states

## Filter State Pattern  
Use signals for filter state:
- filterSignal = signal('all')
- filteredResources = computed(() => resources.filter(...))
- NEVER filter in the template

## Streaming
Only use resource.stream if the feature requires real-time AI responses.

## Commands

```bash
npm start          # ng serve — dev server at http://localhost:4200
npm run build      # ng build — production build to dist/
npm run watch      # ng build --watch --configuration development
npm test           # ng test — runs unit tests via Vitest
```

## Testing Rules

- Test runner: **Vitest** (not Karma). Config lives in `angular.json` under `test.builder`.
- Use `describe` / `it` / `expect` from Vitest — do NOT import from Jasmine.
- Test files: `*.spec.ts` co-located with the source file.
- Do NOT use `TestBed` when simple unit testing suffices — only use it for components that need Angular DI.
- Test signals by calling them as functions: `expect(mySignal()).toBe(value)`.
- Mock HTTP calls with `vi.fn()` or `vi.spyOn()`, never with `HttpClientTestingModule` unless testing Angular HTTP interceptors.
- Keep tests focused: one `describe` per class, one `it` per behavior.

## Angular CLI MCP

The `.claude/mcp.json` exposes the Angular CLI MCP server with experimental tools enabled:
- `build` — one-off `ng build`
- `devserver.start` / `devserver.stop` / `devserver.wait_for_build` — manage `ng serve`
- `test` — run unit tests
- Default tools also available: `get_best_practices`, `search_documentation`, `list_projects`, `onpush_zoneless_migration`
