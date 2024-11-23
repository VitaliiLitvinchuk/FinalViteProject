## Key Features

### Dynamic Component Loading

The InformationMessenger component uses dynamic imports to load components based on a file name. This approach enables efficient loading of only the necessary components, thus optimizing performance.
```ts
const fetchComponent = async () => {
    const module = await import(./messages/${informationMessengerFileName}.tsx);
    setDynamicComponent(() => React.lazy(() => Promise.resolve({ default: module.default })));
};
```
### Code Splitting with React.lazy

The use of React.lazy and Suspense for component loading indicates an efficient approach to code splitting. This technique allows for loading components on demand, reducing the initial bundle size and improving page load times.
```tsx
<Suspense fallback={<div>Loading...</div>}>
    <DynamicComponent />
</Suspense>
```

### Modular Design

The CrudPages component structure demonstrates a modular design, where each CRUD operation has its own directory and components. This approach promotes separation of concerns, making it easier to maintain and update individual components.
```ts
import { cruds } from "./constants";
```

### Centralized State Management

The use of useTypedSelector suggests a centralized state management approach, likely using a state management library like Redux. Centralized state management makes it easier to share state between components and manage global state.

### Reusable Components

Components like Layout and CrudPages are designed to be reusable, promoting DRY (Don't Repeat Yourself) principles. This approach encourages code reuse and makes it easier to maintain a consistent user interface across the application.

## Component Tree
```text
App
├── Layout
│   ├── Header
│   ├── Footer
│   ├── InformationMessenger
│   └── Outlet
│       ├── CrudPages
│       │   ├── Groups
│       │   ├── Statuses
│       │   ├── Courses
│       │   ├── UserRoles
│       │   ├── UserGroupRoles
│       │   ├── Assignments
│       │   ├── UsersGroups
│       │   └── Users
│       │       ├── Template of page structure  
│       │       ├── [User]ModalForm
│       │       │   ├── Create[User]
│       │       │   └── Edit[User] or [User]WorkerModal
```