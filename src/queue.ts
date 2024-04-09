export default class Queue<T>
{
	protected data	: (T|undefined)[];
	protected head	: number = 0;
	protected count	: number = 0;

	constructor( capacity: number = 50 )
	{
		this.data = new Array( capacity );
	}

	private resize(): void
	{
		let new_data = new Array( Math.ceil( this.data.length * 1.35 ));

		for( let i = 0; i < this.count; ++i )
		{
			new_data[i] = this.data[(this.head + i) % this.data.length];
		}

		this.data = new_data;
		this.head = 0;
	}

	public get size(): number
	{
		return this.count;
	}

	public top(): T | void // "peek"
	{
		if( this.count )
		{
			return this.data[this.head];
		}
	}

	public push( item: T ): this
	{
		( this.count === this.data.length ) && this.resize();

		this.data[(this.head + this.count++) % this.data.length] = item;

		return this;
	}

	public pop(): T | void
	{
		if( this.count )
		{
			let item = this.data[this.head];

			this.data[this.head] = undefined;
			this.head = (this.head + 1) % this.data.length;
			this.count--;

			return item;
		}
	}

	public clear(): this
	{
		this.data = new Array( 50 );
		this.head = 0;
		this.count = 0;

		return this;
	}

	public delete( item: T ): boolean
	{
		for( let i = 0; i < this.count; ++i )
		{
			if( this.data[(this.head + i) % this.data.length] === item )
			{
				this.data[(this.head + i) % this.data.length] = undefined;
				
				for( let j = i; j < this.count; ++j )
				{
					this.data[(this.head + j) % this.data.length] = this.data[(this.head + j + 1) % this.data.length];
				}

				--this.count;

				return true;
			}
		}

		return false;
	}
}
