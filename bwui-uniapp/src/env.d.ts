import { ComponentPublicInstance } from 'vue';

declare global {
  type UniApp = typeof uni;

  interface Uni {
    env: {
      USER_DATA_PATH: string;
    };
    canIUse: (schema: string) => boolean;
    needInvoke: (api: string) => boolean;
    request(options: RequestOptions): RequestTask;
    uploadFile(options: UploadFileOptions): UploadTask;
    chooseImage(options: ChooseImageOptions): void;
    previewImage(options: PreviewImageOptions): void;
    getImageInfo(options: GetImageInfoOptions): void;
    compressImage(options: CompressImageOptions): void;
    getLocation(options: GetLocationOptions): void;
    chooseLocation(options: ChooseLocationOptions): void;
    openLocation(options: OpenLocationOptions): void;
    getStorage(options: GetStorageOptions): void;
    getStorageSync(key: string): any;
    setStorage(options: SetStorageOptions): void;
    setStorageSync(key: string, value: any): void;
    removeStorage(options: RemoveStorageOptions): void;
    removeStorageSync(key: string): void;
    clearStorage(): void;
    clearStorageSync(): void;
    getSystemInfo(options: GetSystemInfoOptions): void;
    getSystemInfoSync(): SystemInfo;
    showToast(options: ShowToastOptions): void;
    hideToast(): void;
    showLoading(options: ShowLoadingOptions): void;
    hideLoading(): void;
    showModal(options: ShowModalOptions): void;
    showActionSheet(options: ShowActionSheetOptions): void;
    setNavigationBarTitle(options: SetNavigationBarTitleOptions): void;
    showNavigationBarLoading(): void;
    hideNavigationBarLoading(): void;
    navigateTo(options: NavigateToOptions): void;
    redirectTo(options: RedirectToOptions): void;
    reLaunch(options: ReLaunchOptions): void;
    switchTab(options: SwitchTabOptions): void;
    navigateBack(options?: NavigateBackOptions): void;
    createAnimation(options: CreateAnimationOptions): Animation;
    pageScrollTo(options: PageScrollToOptions): void;
    createSelectorQuery(): SelectorQuery;
    createIntersectionObserver(options?: CreateIntersectionObserverOptions): IntersectionObserver;
    getProvider(options: GetProviderOptions): void;
    login(options: LoginOptions): void;
    getUserInfo(options: GetUserInfoOptions): void;
    chooseAddress(options: ChooseAddressOptions): void;
    chooseInvoiceTitle(options: ChooseInvoiceTitleOptions): void;
    addPhoneContact(options: AddPhoneContactOptions): void;
    openSetting(options: OpenSettingOptions): void;
    getSetting(options: GetSettingOptions): void;
    getWeRunData(options: GetWeRunDataOptions): void;
    choosePaySheet(options: ChoosePaySheetOptions): void;
    reportMonitor(name: string, value: number | string): void;
    reportSuccess(name: string, value: number | string): void;
    onAppShow(callback: (result: App.LaunchShowOption) => void): void;
    onAppHide(callback: (result: App.LaunchOptions) => void): void;
    offAppShow(callback: (result: App.LaunchShowOption) => void): void;
    offAppHide(callback: (result: App.LaunchOptions) => void): void;
  }

  interface RequestOptions {
    url: string;
    data?: any;
    header?: Record<string, string>;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE';
    timeout?: number;
    dataType?: 'json' | 'text' | 'arraybuffer';
    responseType?: 'text' | 'arraybuffer';
    success?: (res: RequestSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface RequestSuccessData {
    data: any;
    statusCode: number;
    header: Record<string, string>;
  }

  interface RequestTask {
    abort(): void;
    onHeadersReceived(callback: (res: { header: Record<string, string> }) => void): void;
    offHeadersReceived(callback: (res: { header: Record<string, string> }) => void): void;
  }

  interface UploadFileOptions {
    url: string;
    filePath: string;
    name: string;
    header?: Record<string, string>;
    formData?: Record<string, string>;
    success?: (res: UploadFileSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface UploadFileSuccessData {
    data: string;
    statusCode: number;
  }

  interface UploadTask {
    onProgressUpdate(callback: (res: UploadTaskProgressOptions) => void): void;
    offProgressUpdate(callback: (res: UploadTaskProgressOptions) => void): void;
    abort(): void;
  }

  interface UploadTaskProgressOptions {
    progress: number;
    totalBytesSent: number;
    totalBytesExpectedToSend: number;
  }

  interface ChooseImageOptions {
    count?: number;
    sizeType?: ('original' | 'compressed')[];
    sourceType?: ('album' | 'camera')[];
    success: (res: ChooseImageSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface ChooseImageSuccessData {
    tempFilePaths: string[];
    tempFiles: TempFile[];
  }

  interface TempFile {
    path: string;
    size: number;
    name?: string;
  }

  interface PreviewImageOptions {
    current?: string | number;
    urls: string[];
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface GetImageInfoOptions {
    src: string;
    success?: (res: GetImageInfoSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface GetImageInfoSuccessData {
    width: number;
    height: number;
    path: string;
    orientation?: string;
    type?: string;
  }

  interface CompressImageOptions {
    src: string;
    quality?: number;
    success?: (res: CompressImageSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface CompressImageSuccessData {
    tempFilePath: string;
  }

  interface GetLocationOptions {
    type?: 'gcj02' | 'wgs84';
    altitude?: boolean;
    success: (res: GetLocationSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface GetLocationSuccessData {
    latitude: number;
    longitude: number;
    speed: number;
    accuracy: number;
    altitude: number;
    verticalAccuracy: number;
    horizontalAccuracy: number;
    address?: string;
  }

  interface ChooseLocationOptions {
    success: (res: ChooseLocationSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface ChooseLocationSuccessData {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }

  interface OpenLocationOptions {
    latitude: number;
    longitude: number;
    scale?: number;
    name?: string;
    address?: string;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface GetStorageOptions {
    key: string;
    success?: (res: GetStorageSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface GetStorageSuccessData {
    data: any;
  }

  interface SetStorageOptions {
    key: string;
    data: any;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface RemoveStorageOptions {
    key: string;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface GetSystemInfoOptions {
    success: (res: SystemInfo) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface SystemInfo {
    brand: string;
    model: string;
    system: string;
    platform: string;
    language: string;
    version: string;
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    statusBarHeight: number;
    navigationBarHeight: number;
    safeArea: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    pixelRatio: number;
    platform?: string;
  }

  interface ShowToastOptions {
    title: string;
    icon?: 'success' | 'loading' | 'error' | 'fail' | 'exception' | 'none';
    image?: string;
    duration?: number;
    position?: 'top' | 'center' | 'bottom';
    mask?: boolean;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface ShowLoadingOptions {
    title: string;
    mask?: boolean;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface ShowModalOptions {
    title?: string;
    content?: string;
    showCancel?: boolean;
    cancelText?: string;
    cancelColor?: string;
    confirmText?: string;
    confirmColor?: string;
    success?: (res: ShowModalSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface ShowModalSuccessData {
    confirm: boolean;
    cancel: boolean;
  }

  interface ShowActionSheetOptions {
    itemList: string[];
    itemColor?: string;
    success?: (res: ShowActionSheetSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface ShowActionSheetSuccessData {
    tapIndex: number;
  }

  interface SetNavigationBarTitleOptions {
    title: string;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface NavigateToOptions {
    url: string;
    events?: Record<string, any>;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface RedirectToOptions {
    url: string;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface ReLaunchOptions {
    url: string;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface SwitchTabOptions {
    url: string;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface NavigateBackOptions {
    delta?: number;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface CreateAnimationOptions {
    duration?: number;
    timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end';
    delay?: number;
    transformOrigin?: string;
  }

  interface Animation {
    opacity(value: number): Animation;
    rotate(value: number): Animation;
    rotateX(value: number): Animation;
    rotateY(value: number): Animation;
    rotateZ(value: number): Animation;
    rotate3d(x: number, y: number, z: number, value: number): Animation;
    scale(sx: number, sy?: number): Animation;
    scaleX(sx: number): Animation;
    scaleY(sy: number): Animation;
    scaleZ(sz: number): Animation;
    scale3d(sx: number, sy: number, sz: number): Animation;
    translate(tx: number, ty?: number): Animation;
    translateX(tx: number): Animation;
    translateY(ty: number): Animation;
    translateZ(tz: number): Animation;
    translate3d(tx: number, ty: number, tz: number): Animation;
    skew(ax: number, ay?: number): Animation;
    skewX(ax: number): Animation;
    skewY(ay: number): Animation;
    matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): Animation;
    matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): Animation;
    backgroundColor(color: string): Animation;
    width(value: string | number): Animation;
    height(value: string | number): Animation;
    top(value: string | number): Animation;
    left(value: string | number): Animation;
    bottom(value: string | number): Animation;
    right(value: string | number): Animation;
    export(): AnimationData;
  }

  interface AnimationData {
    actions: AnimationAction[];
  }

  interface AnimationAction {
    [key: string]: any;
  }

  interface PageScrollToOptions {
    scrollTop: number;
    duration?: number;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface SelectorQuery {
    select(selector: string): NodesRef;
    selectAll(selector: string): NodesRef;
    selectViewport(): NodesRef;
    in(page: any): SelectorQuery;
    exec(callback: (res: any[]) => void): void;
  }

  interface NodesRef {
    boundingClientRect(callback?: (rect: BoundingClientRectCallback | BoundingClientRectCallback[]) => void): SelectorQuery;
    scrollOffset(callback?: (scrollOffset: ScrollOffsetCallback | ScrollOffsetCallback[]) => void): SelectorQuery;
    fields(fields: FieldProps, callback?: (res: any) => void): SelectorQuery;
    node(callback?: (res: { node: NodeRef }) => void): SelectorQuery;
  }

  interface BoundingClientRectCallback {
    id: string;
    dataset: Record<string, any>;
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
  }

  interface ScrollOffsetCallback {
    id: string;
    dataset: Record<string, any>;
    scrollLeft: number;
    scrollTop: number;
  }

  interface FieldProps {
    id?: boolean;
    dataset?: boolean;
    rect?: boolean;
    size?: boolean;
    scrollOffset?: boolean;
    computedStyle?: string[];
    context?: boolean;
    node?: boolean;
    properties?: string[];
  }

  interface NodeRef {
    context: any;
  }

  interface CreateIntersectionObserverOptions {
    thresholds?: number[];
    initialRatio?: number;
    observeAll?: boolean;
  }

  interface IntersectionObserver {
    relativeTo(selector: string, margins?: Margins): IntersectionObserver;
    relativeToViewport(margins?: Margins): IntersectionObserver;
    observe(selector: string, callback: (res: IntersectionObserverObserverCallback) => void): IntersectionObserver;
    unobserve(selector: string): IntersectionObserver;
    disconnect(): IntersectionObserver;
  }

  interface Margins {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  }

  interface IntersectionObserverObserverCallback {
    intersectionRatio: number;
    intersectionRect: BoundingRect;
    boundingRect: BoundingRect;
    time: number;
  }

  interface BoundingRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
  }

  interface GetProviderOptions {
    service: 'oauth' | 'payment' | 'share' | 'push' | 'statistics';
    success?: (res: GetProviderSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface GetProviderSuccessData {
    service: string;
    provider: string[];
  }

  interface LoginOptions {
    timeout?: number;
    success?: (res: LoginSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface LoginSuccessData {
    errMsg: string;
    code: string;
  }

  interface GetUserInfoOptions {
    withCredentials?: boolean;
    lang?: string;
    timeout?: number;
    success?: (res: GetUserInfoSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface GetUserInfoSuccessData {
    userInfo: UserInfo;
    rawData: string;
    signature: string;
    encryptedData: string;
    iv: string;
    errMsg: string;
  }

  interface UserInfo {
    nickName: string;
    gender: number;
    language: string;
    city: string;
    province: string;
    country: string;
    avatarUrl: string;
  }

  interface ChooseAddressOptions {
    success?: (res: ChooseAddressSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface ChooseAddressSuccessData {
    errMsg: string;
    userName: string;
    postalCode: string;
    provinceName: string;
    cityName: string;
    countyName: string;
    detailInfo: string;
    nationalCode: string;
    telNumber: string;
  }

  interface ChooseInvoiceTitleOptions {
    success?: (res: ChooseInvoiceTitleSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface ChooseInvoiceTitleSuccessData {
    errMsg: string;
    title: string;
    taxNumber: string;
    companyAddress: string;
    telephone: string;
    bankName: string;
    bankAccount: string;
  }

  interface AddPhoneContactOptions {
    photoFilePath?: string;
    nickName?: string;
    lastName?: string;
    firstName?: string;
    middleName?: string;
    remark?: string;
    mobilePhoneNumber?: string;
    email?: string;
    url?: string;
    addressCountry?: string;
    addressState?: string;
    addressCity?: string;
    addressStreet?: string;
    addressPostalCode?: string;
    organization?: string;
    title?: string;
    success?: (res: any) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface OpenSettingOptions {
    success?: (res: OpenSettingSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface OpenSettingSuccessData {
    authSetting: AuthSetting;
  }

  interface AuthSetting {
    'scope.userInfo'?: boolean;
    'scope.userLocation'?: boolean;
    'scope.address'?: boolean;
    'scope.record'?: boolean;
    'scope.writePhotosAlbum'?: boolean;
    'scope.camera'?: boolean;
    'scope.invoice'?: boolean;
    'scope.invoiceTitle'?: boolean;
  }

  interface GetSettingOptions {
    withSubscriptions?: boolean;
    success?: (res: GetSettingSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface GetSettingSuccessData {
    authSetting: AuthSetting;
    subscriptionsSetting?: SubscriptionsSetting;
  }

  interface SubscriptionsSetting {
    mainSwitch?: boolean;
    itemSettings?: Record<string, number>;
  }

  interface GetWeRunDataOptions {
    success?: (res: GetWeRunDataSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface GetWeRunDataSuccessData {
    errMsg: string;
    data: string;
  }

  interface ChoosePaySheetOptions {
    orderInfo?: string;
    appExtendInfo?: string;
    success?: (res: ChoosePaySheetSuccessData) => void;
    fail?: (res: any) => void;
    complete?: (res: any) => void;
  }

  interface ChoosePaySheetSuccessData {
    errMsg: string;
    tapIndex: number;
  }

  namespace App {
    interface LaunchShowOption {
      path: string;
      query: Record<string, string>;
      scene: number;
      shareTicket?: string;
      referrerInfo?: ReferrerInfo;
    }

    interface LaunchOptions {
      path: string;
      query: Record<string, string>;
      scene: number;
    }

    interface ReferrerInfo {
      appId: string;
      extraData?: Record<string, any>;
    }
  }

  namespace Page {
    interface RouteOptions {
      route: string;
    }
  }

  interface Wx {
    env: {
      USER_DATA_PATH: string;
    };
    canIUse: (schema: string) => boolean;
    getSystemInfo(options?: GetSystemInfoOptions): void;
    getSystemInfoSync(): SystemInfo;
    showToast(options: ShowToastOptions): void;
    hideToast(): void;
    showLoading(options: ShowLoadingOptions): void;
    hideLoading(): void;
    showModal(options: ShowModalOptions): void;
    showActionSheet(options: ShowActionSheetOptions): void;
    setNavigationBarTitle(options: SetNavigationBarTitleOptions): void;
    showNavigationBarLoading(): void;
    hideNavigationBarLoading(): void;
    navigateTo(options: NavigateToOptions): void;
    redirectTo(options: RedirectToOptions): void;
    reLaunch(options: ReLaunchOptions): void;
    switchTab(options: SwitchTabOptions): void;
    navigateBack(options?: NavigateBackOptions): void;
    request(options: RequestOptions): RequestTask;
    uploadFile(options: UploadFileOptions): UploadTask;
    chooseImage(options: ChooseImageOptions): void;
    previewImage(options: PreviewImageOptions): void;
    getImageInfo(options: GetImageInfoOptions): void;
    compressImage(options: CompressImageOptions): void;
    login(options: LoginOptions): void;
    getUserInfo(options: GetUserInfoOptions): void;
    getSetting(options: GetSettingOptions): void;
    openSetting(options: OpenSettingOptions): void;
    getLocation(options: GetLocationOptions): void;
    chooseLocation(options: ChooseLocationOptions): void;
    openLocation(options: OpenLocationOptions): void;
    getStorage(options: GetStorageOptions): void;
    getStorageSync(key: string): any;
    setStorage(options: SetStorageOptions): void;
    setStorageSync(key: string, value: any): void;
    removeStorage(options: RemoveStorageOptions): void;
    removeStorageSync(key: string): void;
    clearStorage(): void;
    clearStorageSync(): void;
    createAnimation(options: CreateAnimationOptions): Animation;
    pageScrollTo(options: PageScrollToOptions): void;
    createSelectorQuery(): SelectorQuery;
    createIntersectionObserver(options?: CreateIntersectionObserverOptions): IntersectionObserver;
  }

  var wx: Wx;
  var getApp: () => AppInstance;
  var getCurrentPages: () => CurrentPagesInstance[];

  interface AppInstance {
    globalData?: any;
  }

  type CurrentPagesInstance = PageInstance;

  interface PageInstance {
    route: string;
    options: Record<string, string>;
    data: Record<string, any>;
    setData(data: Record<string, any>, callback?: () => void): void;
  }

  interface PageOptions<D extends Record<string, any> = Record<string, any>> {
    data?: D;
    onLoad?(query?: Record<string, string>): void;
    onShow?(): void;
    onReady?(): void;
    onHide?(): void;
    onUnload?(): void;
    onPullDownRefresh?(): void;
    onReachBottom?(): void;
    onShareAppMessage?(options?: ShareMessageInfo): ShareMessageData;
    onPageScroll?(options?: { scrollTop: number }): void;
    onTabItemTap?(options?: TabItemTapInfo): void;
    onResize?(options?: { size: { windowWidth: number; windowHeight: number } }): void;
    methods?: Record<string, any>;
    behaviors?: any[];
    relations?: Record<string, RelationOptions>;
    lifetimes?: {
      created?: () => void;
      attached?: () => void;
      ready?: () => void;
      moved?: () => void;
      detached?: () => void;
    };
    pageLifetimes?: {
      show?: () => void;
      hide?: () => void;
      resize?: (size: { windowWidth: number; windowHeight: number }) => void;
    };
    definitionFilter?(defFields: any): void;
  }

  interface ShareMessageInfo {
    from: string;
    target: any;
    webViewUrl?: string;
  }

  interface ShareMessageData {
    title?: string;
    path?: string;
    imageUrl?: string;
    promise?: Promise<any>;
  }

  interface TabItemTapInfo {
    index: string;
    pagePath: string;
    text: string;
  }

  interface RelationOptions {
    type?: 'parent' | 'child';
    linked?: (target: ComponentInstance, relation: string) => void;
    linkChanged?: (target: ComponentInstance, relation: string) => void;
    unlinked?: (target: ComponentInstance, relation: string) => void;
    link?: (target: ComponentInstance, relation: string) => void;
  }

  interface ComponentInstance<D extends Record<string, any> = Record<string, any>> {
    is?: string;
    id?: string;
    dataset?: Record<string, any>;
    data?: D;
    properties?: D;
    methods?: Record<string, any>;
    setData(data: Record<string, any>, callback?: () => void): void;
    hasBehavior?(behavior: any): boolean;
    triggerEvent(name: string, detail?: any, options?: TriggerEventOptions): void;
    createSelectorQuery(): SelectorQuery;
    createMediaQueryObserver(): any;
    createIntersectionObserver(initData?: CreateIntersectionObserverOptions): IntersectionObserver;
    getNodeId(callback: (id: number) => void): void;
    getPageId(): number;
    isBuiltInDataReporter?(data: Record<string, any>): void;
  }

  interface TriggerEventOptions {
    bubbles?: boolean;
    composed?: boolean;
    capturePhase?: boolean;
  }

  type RecordConstructor = new () => any;

  function Page(options: PageOptions): void;
  function Component(options: ComponentOptions): void;
  function Behavior(options: BehaviorOptions): any;

  interface ComponentOptions<D extends Record<string, any> = Record<string, any>, B = Record<string, any>> {
    data?: D;
    properties?: D;
    methods?: Record<string, any>;
    behaviors?: (B | string)[];
    created?: () => void;
    attached?: () => void;
    ready?: () => void;
    moved?: () => void;
    detached?: () => void;
    relations?: Record<string, RelationOptions>;
    externalClasses?: string[];
    options?: ComponentOptionsOptions;
    lifetimes?: {
      created?: () => void;
      attached?: () => void;
      ready?: () => void;
      moved?: () => void;
      detached?: () => void;
    };
    pageLifetimes?: {
      show?: () => void;
      hide?: () => void;
      resize?: (size: { windowWidth: number; windowHeight: number }) => void;
    };
    definitionFilter?(defFields: any, definitionFilterArr?: any[]): void;
  }

  interface ComponentOptionsOptions {
    multipleSlots?: boolean;
    addGlobalClass?: boolean;
    virtualHost?: boolean;
    styleIsolation?: 'isolated' | 'apply-shared' | 'shared';
  }

  interface BehaviorOptions<D = Record<string, any>> {
    properties?: D;
    data?: D;
    methods?: Record<string, any>;
    behaviors?: (string | BehaviorOptions)[];
    created?: () => void;
    attached?: () => void;
    ready?: () => void;
    moved?: () => void;
    detached?: () => void;
    lifetimes?: {
      created?: () => void;
      attached?: () => void;
      ready?: () => void;
      moved?: () => void;
      detached?: () => void;
    };
  }
}

export {};
