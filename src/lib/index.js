export const randomInRange = function(start, end, count, isRepeated, done) {
  let rand
  const result = done.slice()
  const total = (end - start + 1) - (result.length)

  if(count > total && !isRepeated) return result

  count += result.length
  while (result.length < count) {
    rand = Math.floor(Math.random() * (end - start + 1) + start)
    if (!isRepeated) {
      if(!result.includes(rand)) result.unshift(rand)
    }
    else
      result.unshift(rand)
  }
  // result.sort((a, b) => a - b);
  return result;
}