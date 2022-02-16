export class Success {
  constructor(private readonly code: number, private readonly data: any) {}
}

export class Fail {
  constructor(private readonly code: number, private readonly err: string) {}
}
