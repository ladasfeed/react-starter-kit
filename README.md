# react-starter-kit

## Builders
### router
Go to [Link](#yup)

##### Usage
Argument of function is an object, which specifies 
route object. Output is an object too, but with some features.
You will receive `root: '/'` field, and `root` for every
object inside, and the value will be name of field.
Every child string field will have prefix which is combpination
of parent's(obj) fields names.
 
You can override `root`.
You can disable adding prefixes by adding `!` to start of string.


```
import { builders } from "react-dev-starter-pack";

export const routes = builders.router({
  sandbox: "/sandbox",
  auth: {
    login: "/login",
    password: "/password",
  },
  cabinet: {
    root: '/lk',
    transactions: '/transactions',
    profile: '!/custom-route/profile'  
  },
});
```
Output
```
{
    root: '/',
    auth: {
       root: '/auth',
       login: "/auth/login",
       password: "/auth/password",
    },
    sandbox: "/sandbox",
    cabinet: {
       root: '/lk',
       transactions: '/lk/transactions',
       profile: '/custom-route/profile'  
    },
}
```
### <a name="yup"></a> s
### Yup
Under the hood yupBuilder has built version of yup, but you shoud
to install @types/yup as devDeps.
##### Usage
```
export const YUP = builders.yup({
  text: {
    max: () => "Max",
    min: () => "Min",
    req: "Req",
    email: "Email",
  },
  customSchemas: {},
});

```
Output - Object

| Property | Definition |
| :---: | :---: |
| instance | equals to `import * as yup from 'yup'` | 
| schemas | collection of common schemas + your custom | 
| resolver | @hookform resolver | 
| create | equals to yup.object().shape | 
| create | equals to yup.object().shape | 
| text | text snippets | 

### localStorage
This builder is kind of Proxy between developer and localStorage.
It has only one parameter - generic type of your localStorage model.
It will automatically do JSON.stringify/parse.
Also it has full typescript support.

##### Usage
```
import {builders} from "react-dev-starter-pack";

export const lcController = builders.localStorage<{
    id: string,
    user: {
        name: string,
        age: number
    }
}>()
```
| Property | Definition |
| :---: | :---: |
| get | typed get | 
| set | typed set | 
| clear | localStorage.clear() | 

### api
Makes your function async and awaiting of result.
Has try-catch under the hood.
Returns `Promise<AxiosResponse>`
Usage
```
apiBuilder((phone: string) =>
  authAxios.get(`/user?phone_number=${phone}`)
);
```

### component
Error boundary wrapper with custom fallback component.

Usage 
```
export const createFC = builders.component(() => (
  <div>Something went wrong...</div>
));
```
```
export default createFc((props:any) => {
    return <div>{{}}</div> // your application will not fall
})
```

## Component builders
I have not finished it yet, so you should to specify styles for overriding like:
`label.label` 
`input.input`
### Input
InputBuilder. Output is object with different inputs.
```
export const Input = UIBuilders.InputTextBuilder({
  classNames: {
    elements: {
      input: styles.input,
      label: styles.label,
      error: styles.error,
      wrapper: styles.wrapper,
    },
    state: {
      error: styles.error_state,
    },
  },
  icons: {
    lock: Lock,
    edit: Edit,
    eyeClosed: EyeClosed,
  },
});
```

### Switch

Usage
```
export const Switch = UIBuilders.SwitchBuilder({
  classNames: {
    input: styles.input,
    circle: styles.circle,
    circleContainer: styles.circleContainer,
    container: styles.container,
  },
});

```
Use css vars for restyling rect: 
```
--circle-width: 50px;
--padding: 5px;
--border-radius: 40px;
```

### CheckInput
Radio & Checkbox

Usage variant 1
```
export const CheckInput = UIBuilders.CheckInputBuilder({
  classNames: {
    input: styles.input,
  },
  icons: {
    checkbox: {
      checked: Icons.ui.CheckBoxChecked,
      unchecked: Icons.ui.CheckBoxUnchecked,
    },
    radio: {
      checked: Icons.ui.RadioChecked,
      unchecked: Icons.ui.RadioUnchecked,
    },
  },
});
```
Usage variant 2
```
export const PillSwitch = UIBuilders.CheckInputBuilder<"custom", payloadType>({
  classNames: {
    input: styles.input,
  },
  customElement: {
    component: ({ text }) => {
      return <div className={styles.pill}>{text}</div>;
    },
  },
}).group;
```
```
.input:checked + .pill {
    background: linear-gradient(180deg, #052DB9 0%, #4B78F2 100%);
    box-shadow: 0px 5px 9px rgba(40, 112, 219, 0.36);
    color: white;
}

.pill {
    width: 131px;
    padding: 10px;
    font-size: 18px;
    transition: .4s;
    text-align: center;
    color: black;
    background: linear-gradient(180deg, #FFFFFF 100%, #FFFFFF 100%);
    border: 1px solid #8FA4B0;
    box-sizing: border-box;
    border-radius: 24px;
}
```

## Hooks