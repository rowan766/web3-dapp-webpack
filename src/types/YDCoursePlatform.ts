/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace YDCoursePlatform {
  export type CourseStruct = {
    id: BigNumberish;
    title: string;
    description: string;
    contentHash: string;
    price: BigNumberish;
    instructor: AddressLike;
    isActive: boolean;
    createdAt: BigNumberish;
    totalSales: BigNumberish;
  };

  export type CourseStructOutput = [
    id: bigint,
    title: string,
    description: string,
    contentHash: string,
    price: bigint,
    instructor: string,
    isActive: boolean,
    createdAt: bigint,
    totalSales: bigint
  ] & {
    id: bigint;
    title: string;
    description: string;
    contentHash: string;
    price: bigint;
    instructor: string;
    isActive: boolean;
    createdAt: bigint;
    totalSales: bigint;
  };

  export type PurchaseStruct = {
    courseId: BigNumberish;
    buyer: AddressLike;
    purchaseTime: BigNumberish;
    pricePaid: BigNumberish;
  };

  export type PurchaseStructOutput = [
    courseId: bigint,
    buyer: string,
    purchaseTime: bigint,
    pricePaid: bigint
  ] & {
    courseId: bigint;
    buyer: string;
    purchaseTime: bigint;
    pricePaid: bigint;
  };
}

export interface YDCoursePlatformInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "coursePurchases"
      | "courses"
      | "createCourse"
      | "deactivateCourse"
      | "emergencyWithdrawTokens"
      | "getAllActiveCourses"
      | "getContractTokenBalance"
      | "getCourse"
      | "getCourseContent"
      | "getCoursePurchases"
      | "getPlatformStats"
      | "getUserCourses"
      | "hasUserPurchasedCourse"
      | "nextCourseId"
      | "owner"
      | "platformFeePercentage"
      | "platformFeeRecipient"
      | "purchaseCourse"
      | "reactivateCourse"
      | "setPlatformFeePercentage"
      | "setPlatformFeeRecipient"
      | "transferOwnership"
      | "updateCourse"
      | "updateYDTokenAddress"
      | "userCourses"
      | "userPurchaseHistory"
      | "ydToken"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "CourseCreated"
      | "CourseDeactivated"
      | "CoursePurchased"
      | "CourseUpdated"
      | "InstructorPaid"
      | "PlatformFeePaid"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "coursePurchases",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "courses",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createCourse",
    values: [string, string, string, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deactivateCourse",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyWithdrawTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAllActiveCourses",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getContractTokenBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCourse",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCourseContent",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCoursePurchases",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPlatformStats",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUserCourses",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasUserPurchasedCourse",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nextCourseId",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "platformFeePercentage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "platformFeeRecipient",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseCourse",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "reactivateCourse",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setPlatformFeePercentage",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setPlatformFeeRecipient",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateCourse",
    values: [BigNumberish, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateYDTokenAddress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "userCourses",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userPurchaseHistory",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "ydToken", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "coursePurchases",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "courses", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createCourse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deactivateCourse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyWithdrawTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllActiveCourses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractTokenBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getCourse", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCourseContent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCoursePurchases",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPlatformStats",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserCourses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasUserPurchasedCourse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nextCourseId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "platformFeePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "platformFeeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "purchaseCourse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reactivateCourse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPlatformFeePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPlatformFeeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateCourse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateYDTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userCourses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userPurchaseHistory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ydToken", data: BytesLike): Result;
}

export namespace CourseCreatedEvent {
  export type InputTuple = [
    courseId: BigNumberish,
    title: string,
    instructor: AddressLike,
    price: BigNumberish
  ];
  export type OutputTuple = [
    courseId: bigint,
    title: string,
    instructor: string,
    price: bigint
  ];
  export interface OutputObject {
    courseId: bigint;
    title: string;
    instructor: string;
    price: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CourseDeactivatedEvent {
  export type InputTuple = [courseId: BigNumberish];
  export type OutputTuple = [courseId: bigint];
  export interface OutputObject {
    courseId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CoursePurchasedEvent {
  export type InputTuple = [
    courseId: BigNumberish,
    buyer: AddressLike,
    price: BigNumberish,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    courseId: bigint,
    buyer: string,
    price: bigint,
    timestamp: bigint
  ];
  export interface OutputObject {
    courseId: bigint;
    buyer: string;
    price: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CourseUpdatedEvent {
  export type InputTuple = [
    courseId: BigNumberish,
    title: string,
    newPrice: BigNumberish
  ];
  export type OutputTuple = [courseId: bigint, title: string, newPrice: bigint];
  export interface OutputObject {
    courseId: bigint;
    title: string;
    newPrice: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InstructorPaidEvent {
  export type InputTuple = [instructor: AddressLike, amount: BigNumberish];
  export type OutputTuple = [instructor: string, amount: bigint];
  export interface OutputObject {
    instructor: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PlatformFeePaidEvent {
  export type InputTuple = [recipient: AddressLike, amount: BigNumberish];
  export type OutputTuple = [recipient: string, amount: bigint];
  export interface OutputObject {
    recipient: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface YDCoursePlatform extends BaseContract {
  connect(runner?: ContractRunner | null): YDCoursePlatform;
  waitForDeployment(): Promise<this>;

  interface: YDCoursePlatformInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  coursePurchases: TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [
      [bigint, string, bigint, bigint] & {
        courseId: bigint;
        buyer: string;
        purchaseTime: bigint;
        pricePaid: bigint;
      }
    ],
    "view"
  >;

  courses: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        string,
        string,
        bigint,
        string,
        boolean,
        bigint,
        bigint
      ] & {
        id: bigint;
        title: string;
        description: string;
        contentHash: string;
        price: bigint;
        instructor: string;
        isActive: boolean;
        createdAt: bigint;
        totalSales: bigint;
      }
    ],
    "view"
  >;

  createCourse: TypedContractMethod<
    [
      _title: string,
      _description: string,
      _contentHash: string,
      _price: BigNumberish,
      _instructor: AddressLike
    ],
    [bigint],
    "nonpayable"
  >;

  deactivateCourse: TypedContractMethod<
    [courseId: BigNumberish],
    [void],
    "nonpayable"
  >;

  emergencyWithdrawTokens: TypedContractMethod<[], [void], "nonpayable">;

  getAllActiveCourses: TypedContractMethod<
    [],
    [YDCoursePlatform.CourseStructOutput[]],
    "view"
  >;

  getContractTokenBalance: TypedContractMethod<[], [bigint], "view">;

  getCourse: TypedContractMethod<
    [courseId: BigNumberish],
    [YDCoursePlatform.CourseStructOutput],
    "view"
  >;

  getCourseContent: TypedContractMethod<
    [courseId: BigNumberish],
    [string],
    "view"
  >;

  getCoursePurchases: TypedContractMethod<
    [courseId: BigNumberish],
    [YDCoursePlatform.PurchaseStructOutput[]],
    "view"
  >;

  getPlatformStats: TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint] & {
        totalCourses: bigint;
        activeCourses: bigint;
        totalSales: bigint;
      }
    ],
    "view"
  >;

  getUserCourses: TypedContractMethod<[user: AddressLike], [bigint[]], "view">;

  hasUserPurchasedCourse: TypedContractMethod<
    [user: AddressLike, courseId: BigNumberish],
    [boolean],
    "view"
  >;

  nextCourseId: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  platformFeePercentage: TypedContractMethod<[], [bigint], "view">;

  platformFeeRecipient: TypedContractMethod<[], [string], "view">;

  purchaseCourse: TypedContractMethod<
    [courseId: BigNumberish],
    [void],
    "nonpayable"
  >;

  reactivateCourse: TypedContractMethod<
    [courseId: BigNumberish],
    [void],
    "nonpayable"
  >;

  setPlatformFeePercentage: TypedContractMethod<
    [_feePercentage: BigNumberish],
    [void],
    "nonpayable"
  >;

  setPlatformFeeRecipient: TypedContractMethod<
    [_recipient: AddressLike],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  updateCourse: TypedContractMethod<
    [
      courseId: BigNumberish,
      _title: string,
      _description: string,
      _price: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  updateYDTokenAddress: TypedContractMethod<
    [_newYDTokenAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  userCourses: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [boolean],
    "view"
  >;

  userPurchaseHistory: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [bigint],
    "view"
  >;

  ydToken: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "coursePurchases"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: BigNumberish],
    [
      [bigint, string, bigint, bigint] & {
        courseId: bigint;
        buyer: string;
        purchaseTime: bigint;
        pricePaid: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "courses"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        string,
        string,
        bigint,
        string,
        boolean,
        bigint,
        bigint
      ] & {
        id: bigint;
        title: string;
        description: string;
        contentHash: string;
        price: bigint;
        instructor: string;
        isActive: boolean;
        createdAt: bigint;
        totalSales: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "createCourse"
  ): TypedContractMethod<
    [
      _title: string,
      _description: string,
      _contentHash: string,
      _price: BigNumberish,
      _instructor: AddressLike
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "deactivateCourse"
  ): TypedContractMethod<[courseId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "emergencyWithdrawTokens"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getAllActiveCourses"
  ): TypedContractMethod<[], [YDCoursePlatform.CourseStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "getContractTokenBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getCourse"
  ): TypedContractMethod<
    [courseId: BigNumberish],
    [YDCoursePlatform.CourseStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getCourseContent"
  ): TypedContractMethod<[courseId: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getCoursePurchases"
  ): TypedContractMethod<
    [courseId: BigNumberish],
    [YDCoursePlatform.PurchaseStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getPlatformStats"
  ): TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint] & {
        totalCourses: bigint;
        activeCourses: bigint;
        totalSales: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserCourses"
  ): TypedContractMethod<[user: AddressLike], [bigint[]], "view">;
  getFunction(
    nameOrSignature: "hasUserPurchasedCourse"
  ): TypedContractMethod<
    [user: AddressLike, courseId: BigNumberish],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "nextCourseId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "platformFeePercentage"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "platformFeeRecipient"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "purchaseCourse"
  ): TypedContractMethod<[courseId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "reactivateCourse"
  ): TypedContractMethod<[courseId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setPlatformFeePercentage"
  ): TypedContractMethod<[_feePercentage: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setPlatformFeeRecipient"
  ): TypedContractMethod<[_recipient: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateCourse"
  ): TypedContractMethod<
    [
      courseId: BigNumberish,
      _title: string,
      _description: string,
      _price: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateYDTokenAddress"
  ): TypedContractMethod<
    [_newYDTokenAddress: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "userCourses"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "userPurchaseHistory"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "ydToken"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "CourseCreated"
  ): TypedContractEvent<
    CourseCreatedEvent.InputTuple,
    CourseCreatedEvent.OutputTuple,
    CourseCreatedEvent.OutputObject
  >;
  getEvent(
    key: "CourseDeactivated"
  ): TypedContractEvent<
    CourseDeactivatedEvent.InputTuple,
    CourseDeactivatedEvent.OutputTuple,
    CourseDeactivatedEvent.OutputObject
  >;
  getEvent(
    key: "CoursePurchased"
  ): TypedContractEvent<
    CoursePurchasedEvent.InputTuple,
    CoursePurchasedEvent.OutputTuple,
    CoursePurchasedEvent.OutputObject
  >;
  getEvent(
    key: "CourseUpdated"
  ): TypedContractEvent<
    CourseUpdatedEvent.InputTuple,
    CourseUpdatedEvent.OutputTuple,
    CourseUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "InstructorPaid"
  ): TypedContractEvent<
    InstructorPaidEvent.InputTuple,
    InstructorPaidEvent.OutputTuple,
    InstructorPaidEvent.OutputObject
  >;
  getEvent(
    key: "PlatformFeePaid"
  ): TypedContractEvent<
    PlatformFeePaidEvent.InputTuple,
    PlatformFeePaidEvent.OutputTuple,
    PlatformFeePaidEvent.OutputObject
  >;

  filters: {
    "CourseCreated(uint256,string,address,uint256)": TypedContractEvent<
      CourseCreatedEvent.InputTuple,
      CourseCreatedEvent.OutputTuple,
      CourseCreatedEvent.OutputObject
    >;
    CourseCreated: TypedContractEvent<
      CourseCreatedEvent.InputTuple,
      CourseCreatedEvent.OutputTuple,
      CourseCreatedEvent.OutputObject
    >;

    "CourseDeactivated(uint256)": TypedContractEvent<
      CourseDeactivatedEvent.InputTuple,
      CourseDeactivatedEvent.OutputTuple,
      CourseDeactivatedEvent.OutputObject
    >;
    CourseDeactivated: TypedContractEvent<
      CourseDeactivatedEvent.InputTuple,
      CourseDeactivatedEvent.OutputTuple,
      CourseDeactivatedEvent.OutputObject
    >;

    "CoursePurchased(uint256,address,uint256,uint256)": TypedContractEvent<
      CoursePurchasedEvent.InputTuple,
      CoursePurchasedEvent.OutputTuple,
      CoursePurchasedEvent.OutputObject
    >;
    CoursePurchased: TypedContractEvent<
      CoursePurchasedEvent.InputTuple,
      CoursePurchasedEvent.OutputTuple,
      CoursePurchasedEvent.OutputObject
    >;

    "CourseUpdated(uint256,string,uint256)": TypedContractEvent<
      CourseUpdatedEvent.InputTuple,
      CourseUpdatedEvent.OutputTuple,
      CourseUpdatedEvent.OutputObject
    >;
    CourseUpdated: TypedContractEvent<
      CourseUpdatedEvent.InputTuple,
      CourseUpdatedEvent.OutputTuple,
      CourseUpdatedEvent.OutputObject
    >;

    "InstructorPaid(address,uint256)": TypedContractEvent<
      InstructorPaidEvent.InputTuple,
      InstructorPaidEvent.OutputTuple,
      InstructorPaidEvent.OutputObject
    >;
    InstructorPaid: TypedContractEvent<
      InstructorPaidEvent.InputTuple,
      InstructorPaidEvent.OutputTuple,
      InstructorPaidEvent.OutputObject
    >;

    "PlatformFeePaid(address,uint256)": TypedContractEvent<
      PlatformFeePaidEvent.InputTuple,
      PlatformFeePaidEvent.OutputTuple,
      PlatformFeePaidEvent.OutputObject
    >;
    PlatformFeePaid: TypedContractEvent<
      PlatformFeePaidEvent.InputTuple,
      PlatformFeePaidEvent.OutputTuple,
      PlatformFeePaidEvent.OutputObject
    >;
  };
}
